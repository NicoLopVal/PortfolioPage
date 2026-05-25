import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  GlassTranslucency,
  glassOpacityHostStyles,
  GlassOpacityStyleVars,
} from '../glass-opacity.util';

export type GlassInputType = 'text' | 'search';

@Component({
  selector: 'app-liquid-glass-input',
  standalone: true,
  templateUrl: './liquid-glass-input.component.html',
  styleUrl: './liquid-glass-input.component.scss',
  host: {
    class: 'liquid-glass-input-host',
    '[class.liquid-glass-input-host--with-icon]': 'icon === "search"',
    '[style]': 'opacityStyles',
  },
})
export class LiquidGlassInputComponent {
  @Input() type: GlassInputType = 'text';
  @Input() placeholder = '';
  @Input() icon?: 'search';
  @Input() value = '';
  @Input() disabled = false;
  @Input() translucency: GlassTranslucency = 'medium';
  @Input() translucencyLevel?: number;
  @Output() valueChange = new EventEmitter<string>();

  get opacityStyles(): GlassOpacityStyleVars {
    return glassOpacityHostStyles(this.translucency, this.translucencyLevel);
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.valueChange.emit(target.value);
  }
}
