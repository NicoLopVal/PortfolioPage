/**
 * Controls how see-through the glass surface is.
 * - `light` — most translucent (background shows through clearly)
 * - `medium` — default balance
 * - `heavy` — more frosted / less translucent
 *
 * Optional `translucencyLevel` (0–100) fine-tunes on top of a preset;
 * 0 = most translucent, 100 = most frosted.
 */
export type GlassTranslucency = 'light' | 'medium' | 'heavy';

export interface GlassOpacityStyleVars {
  '--glass-fill-opacity': string;
  '--glass-border-opacity': string;
  '--glass-shine-opacity': string;
  '--glass-fallback-opacity': string;
}

const PRESET_FACTOR: Record<GlassTranslucency, number> = {
  light: 1,
  medium: 0.55,
  heavy: 0.15,
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/** 0 = most translucent, 1 = most frosted */
function resolveFactor(preset: GlassTranslucency, level?: number | null): number {
  if (level != null && !Number.isNaN(level)) {
    return clamp(level, 0, 100) / 100;
  }
  return PRESET_FACTOR[preset];
}

export function glassOpacityHostStyles(
  preset: GlassTranslucency = 'medium',
  level?: number | null
): GlassOpacityStyleVars {
  const frosted = resolveFactor(preset, level);

  const fill = 0.04 + frosted * 0.16;
  const border = 0.14 + frosted * 0.28;
  const shine = 0.12 + frosted * 0.38;
  const fallback = 0.72 + frosted * 0.24;

  return {
    '--glass-fill-opacity': String(fill),
    '--glass-border-opacity': String(border),
    '--glass-shine-opacity': String(shine),
    '--glass-fallback-opacity': String(fallback),
  };
}
