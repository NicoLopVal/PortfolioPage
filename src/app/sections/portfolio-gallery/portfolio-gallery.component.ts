import { Component, HostListener, signal } from '@angular/core';
import { PORTFOLIO_DATA } from '../../core/data/portfolio.data';
import { PortfolioItem } from '../../core/models/portfolio.models';
import { SectionHeaderComponent } from '../../layout/section-header/section-header.component';
import { LiquidGlassPanelComponent } from '../../shared/liquid-glass';

export type DescriptionBlock =
  | { type: 'heading'; text: string }
  | { type: 'bullet'; text: string };

@Component({
  selector: 'app-portfolio-gallery',
  standalone: true,
  imports: [SectionHeaderComponent, LiquidGlassPanelComponent],
  templateUrl: './portfolio-gallery.component.html',
  styleUrl: './portfolio-gallery.component.scss',
})
export class PortfolioGalleryComponent {
  readonly data = PORTFOLIO_DATA;
  readonly selectedItem = signal<PortfolioItem | null>(null);

  openModal(item: PortfolioItem): void {
    this.selectedItem.set(item);
  }

  closeModal(): void {
    this.selectedItem.set(null);
  }

  onOverlayClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.selectedItem()) {
      this.closeModal();
    }
  }

  parseDescription(description: string): DescriptionBlock[] {
    const blocks: DescriptionBlock[] = [];

    for (const line of description.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed) {
        continue;
      }

      if (trimmed.startsWith('- ')) {
        blocks.push({ type: 'bullet', text: trimmed.slice(2).trim() });
      } else {
        blocks.push({ type: 'heading', text: trimmed });
      }
    }

    return blocks;
  }
}
