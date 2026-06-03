import { Component, Input } from '@angular/core';
import {
  GlassTranslucency,
  glassOpacityHostStyles,
  GlassOpacityStyleVars,
} from '../glass-opacity.util';

export type GlassButtonVariant = 'solid' | 'glass';
export type GlassButtonColor = 'accent' | 'purple' | 'teal';

@Component({
  selector: 'app-liquid-glass-button',
  standalone: true,
  templateUrl: './liquid-glass-button.component.html',
  styleUrl: './liquid-glass-button.component.scss',
  host: {
    class: 'liquid-glass-button-host',
    '[class.liquid-glass-button-host--solid]': 'variant === "solid"',
    '[class.liquid-glass-button-host--glass]': 'variant === "glass"',
    '[class.liquid-glass-button-host--accent]': 'color === "accent"',
    '[class.liquid-glass-button-host--purple]': 'color === "purple"',
    '[class.liquid-glass-button-host--teal]': 'color === "teal"',
    '[style]': 'variant === "glass" ? opacityStyles : null',
  },
})
export class LiquidGlassButtonComponent {
  /** Button text (preferred over projected content for reliable rendering) */
  @Input() label?: string;
  @Input() variant: GlassButtonVariant = 'glass';
  @Input() color: GlassButtonColor = 'accent';
  @Input() href?: string;
  @Input() target?: '_blank' | '_self' | '_parent' | '_top';
  @Input() type: 'button' | 'submit' = 'button';
  @Input() disabled = false;
  @Input() download = false;
  @Input() translucency: GlassTranslucency = 'medium';
  @Input() translucencyLevel?: number;

  get opacityStyles(): GlassOpacityStyleVars {
    return glassOpacityHostStyles(this.translucency, this.translucencyLevel);
  }
}
