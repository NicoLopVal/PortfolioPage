import { Component, Input } from '@angular/core';
import { RevealDirective } from '../../shared/reveal/reveal.directive';

@Component({
  selector: 'app-section-header',
  standalone: true,
  templateUrl: './section-header.component.html',
  styleUrl: './section-header.component.scss',
  // Reveal-on-scroll: the host fades in and triggers the ridgeline draw +
  // gradient-descent ball animation (keyed off `.is-revealed` in the SCSS).
  hostDirectives: [RevealDirective],
})
export class SectionHeaderComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) watermarkLetter!: string;
  @Input() light = false;
}
