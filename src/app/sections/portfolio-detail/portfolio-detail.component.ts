import { Component, computed, HostListener, inject, signal } from '@angular/core';
import { PortfolioNavigationService } from '../../core/services/portfolio-navigation.service';
import { EnergyLpFigureComponent } from '../../shared/math-figure/energy-lp-figure.component';

export type DescriptionBlock =
  | { type: 'heading'; text: string }
  | { type: 'bullet'; text: string }
  | { type: 'paragraph'; text: string };

/** Role of a dot in the compact pager (max 3 dots shown at once). */
export type PagerDotRole = 'prev' | 'current' | 'next';

@Component({
  selector: 'app-portfolio-detail',
  standalone: true,
  imports: [EnergyLpFigureComponent],
  templateUrl: './portfolio-detail.component.html',
  styleUrl: './portfolio-detail.component.scss',
})
export class PortfolioDetailComponent {
  readonly nav = inject(PortfolioNavigationService);
  readonly slideDir = signal<'prev' | 'next' | null>(null);

  /**
   * Compact pager model: an empty dot for each available direction plus the
   * filled "current" dot in between.
   *   • first item → [current, next]            (2 dots)
   *   • last item  → [prev, current]            (2 dots)
   *   • middle     → [prev, current, next]      (3 dots)
   */
  readonly pagerDots = computed<PagerDotRole[]>(() => {
    const dots: PagerDotRole[] = [];
    if (this.nav.hasPrev()) dots.push('prev');
    dots.push('current');
    if (this.nav.hasNext()) dots.push('next');
    return dots;
  });

  private slideTimer: ReturnType<typeof setTimeout> | null = null;

  // ── Swipe (mobile) ────────────────────────────────────────────────────────
  private touchStartX = 0;
  private touchStartY = 0;
  private touchTracking = false;

  /** Min horizontal travel (px) to register a swipe. */
  private static readonly SWIPE_THRESHOLD = 55;

  private slide(dir: 'prev' | 'next', action: () => void): void {
    if (this.slideTimer) clearTimeout(this.slideTimer);
    action();
    this.slideDir.set(dir);
    this.slideTimer = setTimeout(() => this.slideDir.set(null), 380);
  }

  goPrev(): void { this.slide('prev', () => this.nav.prev()); }
  goNext(): void { this.slide('next', () => this.nav.next()); }
  goToItem(i: number): void {
    if (i === this.nav.currentIndex()) return;
    const dir = i > this.nav.currentIndex() ? 'next' : 'prev';
    this.slide(dir, () => this.nav.goTo(i));
  }

  /** Dot pager click — only the directional dots navigate. */
  onDotClick(role: PagerDotRole): void {
    if (role === 'prev') this.goPrev();
    else if (role === 'next') this.goNext();
  }

  // ── Swipe gestures (mobile) ─────────────────────────────────────────────────
  //
  // Track a single-finger gesture on the whole detail layer. We only act on
  // touchend, comparing horizontal vs vertical travel so that normal vertical
  // scrolling of the content is never hijacked. Native scroll is left intact
  // (no preventDefault), so the page still scrolls while reading.

  @HostListener('touchstart', ['$event'])
  onTouchStart(e: TouchEvent): void {
    if (e.touches.length !== 1) { this.touchTracking = false; return; }
    this.touchStartX = e.touches[0].clientX;
    this.touchStartY = e.touches[0].clientY;
    this.touchTracking = true;
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(e: TouchEvent): void {
    if (!this.touchTracking) return;
    this.touchTracking = false;

    const touch = e.changedTouches[0];
    const dx = touch.clientX - this.touchStartX;
    const dy = touch.clientY - this.touchStartY;

    // Ignore mostly-vertical gestures and short flicks.
    if (Math.abs(dx) < PortfolioDetailComponent.SWIPE_THRESHOLD) return;
    if (Math.abs(dx) <= Math.abs(dy)) return;

    // Swipe left → next project; swipe right → previous project.
    if (dx < 0) this.goNext();
    else this.goPrev();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (!this.nav.closing()) this.nav.close();
  }

  @HostListener('document:keydown.arrowleft')
  onLeft(): void { this.goPrev(); }

  @HostListener('document:keydown.arrowright')
  onRight(): void { this.goNext(); }

  parseDescription(description: string): DescriptionBlock[] {
    const blocks: DescriptionBlock[] = [];
    for (const line of description.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      if (trimmed.startsWith('# ')) {
        blocks.push({ type: 'heading', text: trimmed.slice(2).trim() });
      } else if (trimmed.startsWith('- ')) {
        blocks.push({ type: 'bullet', text: trimmed.slice(2).trim() });
      } else {
        blocks.push({ type: 'paragraph', text: trimmed });
      }
    }
    return blocks;
  }
}
