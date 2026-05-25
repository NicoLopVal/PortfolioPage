import { Component, Input } from '@angular/core';
import {
  GlassTranslucency,
  glassOpacityHostStyles,
  GlassOpacityStyleVars,
} from '../glass-opacity.util';

export type GlassPanelPadding = 'sm' | 'md' | 'lg';
export type GlassPanelRadius = 'md' | 'lg' | 'pill';
export type GlassPanelTint = 'neutral' | 'accent' | 'gradient';

@Component({
  selector: 'app-liquid-glass-panel',
  standalone: true,
  templateUrl: './liquid-glass-panel.component.html',
  styleUrl: './liquid-glass-panel.component.scss',
  host: {
    class: 'liquid-glass-panel',
    '[class.liquid-glass-panel--padding-sm]': 'padding === "sm"',
    '[class.liquid-glass-panel--padding-md]': 'padding === "md"',
    '[class.liquid-glass-panel--padding-lg]': 'padding === "lg"',
    '[class.liquid-glass-panel--radius-md]': 'radius === "md"',
    '[class.liquid-glass-panel--radius-lg]': 'radius === "lg"',
    '[class.liquid-glass-panel--radius-pill]': 'radius === "pill"',
    '[class.liquid-glass-panel--tint-accent]': 'tint === "accent"',
    '[class.liquid-glass-panel--tint-gradient]': 'tint === "gradient"',
    '[style]': 'opacityStyles',
  },
})
export class LiquidGlassPanelComponent {
  @Input() padding: GlassPanelPadding = 'lg';
  @Input() radius: GlassPanelRadius = 'lg';
  @Input() tint: GlassPanelTint = 'neutral';
  /** Preset: light = more see-through, heavy = more frosted */
  @Input() translucency: GlassTranslucency = 'medium';
  /** Fine-tune 0 (most translucent) – 100 (most frosted); overrides preset when set */
  @Input() translucencyLevel?: number;

  get opacityStyles(): GlassOpacityStyleVars {
    return glassOpacityHostStyles(this.translucency, this.translucencyLevel);
  }
}
