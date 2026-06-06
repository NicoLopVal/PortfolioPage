import { Component, HostListener, signal } from '@angular/core';
import { PORTFOLIO_DATA } from '../../core/data/portfolio.data';
import {
  LiquidGlassButtonComponent,
  LiquidGlassPanelComponent,
} from '../../shared/liquid-glass';
@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [LiquidGlassPanelComponent, LiquidGlassButtonComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  readonly data = PORTFOLIO_DATA;
  readonly cvExpanded = signal(false);

  readonly cvLinks = {
    orCv: 'https://docs.google.com/document/d/1lcOICqrkhc5BAC6MPEghj4rA7uUTvs4e/export?format=pdf',
    softwareCv: 'https://docs.google.com/document/d/1to6nrNpyiBqMFQemtlokv723vMGMvp-V/export?format=pdf',
  } as const;

  toggleCv(event: MouseEvent): void {
    event.stopPropagation();
    this.cvExpanded.update(v => !v);
  }

  collapseCv(): void {
    this.cvExpanded.set(false);
  }

  @HostListener('document:click')
  onDocumentClick(): void {
    if (this.cvExpanded()) {
      this.cvExpanded.set(false);
    }
  }
}
