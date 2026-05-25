import { Component, Input } from '@angular/core';
import {
  GlassTranslucency,
  glassOpacityHostStyles,
  GlassOpacityStyleVars,
} from '../glass-opacity.util';

@Component({
  selector: 'app-liquid-glass-card',
  standalone: true,
  templateUrl: './liquid-glass-card.component.html',
  styleUrl: './liquid-glass-card.component.scss',
  host: {
    class: 'liquid-glass-card',
    '[style]': 'opacityStyles',
  },
})
export class LiquidGlassCardComponent {
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() translucency: GlassTranslucency = 'medium';
  @Input() translucencyLevel?: number;

  get opacityStyles(): GlassOpacityStyleVars {
    return glassOpacityHostStyles(this.translucency, this.translucencyLevel);
  }
}
