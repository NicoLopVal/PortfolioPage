import { PortfolioItem, TileSize } from '../../core/models/portfolio.models';

/**
 * Gallery tile packing.
 *
 * Each project declares a preferred `size`, but a fixed set of preferred sizes
 * only tiles a clean rectangle for one particular project count. Add or filter
 * projects and the preferred footprints leave a hole in the last row — or, if
 * an oversized tile can't fit beside its neighbours, mid-grid.
 *
 * So `size` is treated as a *guide*: every size has a list of acceptable
 * footprints ordered best-first, and we search for the combination that tiles a
 * perfect rectangle while deviating from the authored sizes as little as
 * possible. A project only loses (or gains) span when keeping it would leave a
 * gap.
 */

export interface TileSpan {
  cols: number;
  rows: number;
}

export interface GalleryTile {
  item: PortfolioItem;
  cols: number;
  rows: number;
}

/**
 * Acceptable footprints per authored size, most-preferred first — the index in
 * this list is the deviation penalty, so the search naturally keeps the
 * authored size wherever it can.
 *
 * Keyed by column count because a footprint that reads as "big" in a 3-column
 * grid is the whole row in a 2-column one. Nothing may span more columns than
 * the grid has, and nothing but `large` is ever more than one row tall — a
 * tall tile in a narrow grid is what produced the stretched-out shapes the
 * fixed row height now prevents.
 */
const CANDIDATES: Record<number, Record<TileSize, readonly TileSpan[]>> = {
  1: {
    large: [{ cols: 1, rows: 1 }],
    wide: [{ cols: 1, rows: 1 }],
    medium: [{ cols: 1, rows: 1 }],
    small: [{ cols: 1, rows: 1 }],
  },
  2: {
    large: [{ cols: 2, rows: 1 }, { cols: 1, rows: 1 }],
    wide: [{ cols: 1, rows: 1 }, { cols: 2, rows: 1 }],
    medium: [{ cols: 1, rows: 1 }, { cols: 2, rows: 1 }],
    small: [{ cols: 1, rows: 1 }, { cols: 2, rows: 1 }],
  },
  3: {
    large: [{ cols: 2, rows: 2 }, { cols: 2, rows: 1 }, { cols: 1, rows: 1 }],
    wide: [{ cols: 2, rows: 1 }, { cols: 1, rows: 1 }],
    medium: [{ cols: 1, rows: 1 }, { cols: 2, rows: 1 }],
    small: [{ cols: 1, rows: 1 }, { cols: 2, rows: 1 }],
  },
};

/**
 * Packs `items` into a `requestedCols`-wide grid, adjusting footprints as
 * needed so the result is a gap-free rectangle.
 *
 * The returned spans are meant to be handed straight to CSS grid auto-placement
 * (`grid-column: span N`). That is sound because the search only accepts
 * layouts where every tile lands on the first free cell in row-major order —
 * exactly where the browser's sparse auto-placement cursor puts it when nothing
 * is ever skipped.
 */
export function layoutTiles(items: PortfolioItem[], requestedCols: number): GalleryTile[] {
  if (items.length === 0) return [];

  // Never use more columns than there are projects, so a filter that matches
  // one or two projects doesn't have to stretch them across the full width.
  const cols = Math.min(Math.max(requestedCols, 1), items.length, 3);
  const table = CANDIDATES[cols];

  // Worst case every tile is 1x1 and sits on its own row.
  const maxRows = items.length + 1;
  const occupied: boolean[][] = Array.from({ length: maxRows }, () =>
    new Array<boolean>(cols).fill(false),
  );

  const chosen = new Array<TileSpan>(items.length);
  let best: TileSpan[] | null = null;
  let bestPenalty = Infinity;

  const firstFree = (): [number, number] => {
    for (let r = 0; r < maxRows; r++) {
      for (let c = 0; c < cols; c++) {
        if (!occupied[r][c]) return [r, c];
      }
    }
    return [maxRows, 0];
  };

  const mark = (r0: number, c0: number, span: TileSpan, value: boolean): void => {
    for (let r = r0; r < r0 + span.rows; r++) {
      for (let c = c0; c < c0 + span.cols; c++) occupied[r][c] = value;
    }
  };

  const isRectangle = (): boolean => {
    let lastUsed = -1;
    for (let r = maxRows - 1; r >= 0; r--) {
      if (occupied[r].some(Boolean)) {
        lastUsed = r;
        break;
      }
    }
    for (let r = 0; r <= lastUsed; r++) {
      if (!occupied[r].every(Boolean)) return false;
    }
    return true;
  };

  const search = (index: number, penalty: number): void => {
    // Any deeper branch can only add penalty, so a branch that has already
    // matched the incumbent cannot beat it.
    if (penalty >= bestPenalty) return;

    if (index === items.length) {
      if (!isRectangle()) return;
      bestPenalty = penalty;
      best = chosen.slice();
      return;
    }

    const [r0, c0] = firstFree();
    if (r0 + 1 >= maxRows) return; // out of scratch space (unreachable in practice)

    const candidates = table[items[index].size];
    for (let k = 0; k < candidates.length; k++) {
      const span = candidates[k];
      if (c0 + span.cols > cols) continue;
      if (r0 + span.rows > maxRows) continue;

      let fits = true;
      for (let r = r0; r < r0 + span.rows && fits; r++) {
        for (let c = c0; c < c0 + span.cols; c++) {
          if (occupied[r][c]) {
            fits = false;
            break;
          }
        }
      }
      if (!fits) continue;

      mark(r0, c0, span, true);
      chosen[index] = span;
      search(index + 1, penalty + k);
      mark(r0, c0, span, false);
    }
  };

  search(0, 0);

  // No perfect tiling exists for this set (e.g. two projects in a 3-column
  // grid). Fall back to the authored sizes clamped to the grid width — a gap
  // beats a broken layout.
  const spans: TileSpan[] =
    best ?? items.map((item) => clamp(table[item.size][0], cols));

  return items.map((item, i) => ({ item, cols: spans[i].cols, rows: spans[i].rows }));
}

function clamp(span: TileSpan, cols: number): TileSpan {
  return { cols: Math.min(span.cols, cols), rows: span.rows };
}
