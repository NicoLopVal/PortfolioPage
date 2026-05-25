import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  GlassTranslucency,
  glassOpacityHostStyles,
  GlassOpacityStyleVars,
} from '../glass-opacity.util';

@Component({
  selector: 'app-liquid-glass-toggle',
  standalone: true,
  templateUrl: './liquid-glass-toggle.component.html',
  styleUrl: './liquid-glass-toggle.component.scss',
  host: {
    class: 'liquid-glass-toggle-host',
    '[class.liquid-glass-toggle-host--checked]': 'checked',
    '[style]': 'opacityStyles',
  },
})
export class LiquidGlassToggleComponent {
  @Input() checked = false;
  @Input() disabled = false;
  @Input() translucency: GlassTranslucency = 'medium';
  @Input() translucencyLevel?: number;
  @Output() checkedChange = new EventEmitter<boolean>();

  get opacityStyles(): GlassOpacityStyleVars {
    return glassOpacityHostStyles(this.translucency, this.translucencyLevel);
  }

  toggle(): void {
    if (this.disabled) return;
    this.checked = !this.checked;
    this.checkedChange.emit(this.checked);
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.toggle();
    }
  }
}
