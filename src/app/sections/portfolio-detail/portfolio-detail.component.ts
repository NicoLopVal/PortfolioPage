import { Component, HostListener, inject } from '@angular/core';
import { PortfolioNavigationService } from '../../core/services/portfolio-navigation.service';

export type DescriptionBlock =
  | { type: 'heading'; text: string }
  | { type: 'bullet'; text: string };

@Component({
  selector: 'app-portfolio-detail',
  standalone: true,
  imports: [],
  templateUrl: './portfolio-detail.component.html',
  styleUrl: './portfolio-detail.component.scss',
})
export class PortfolioDetailComponent {
  readonly nav = inject(PortfolioNavigationService);

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (!this.nav.closing()) this.nav.close();
  }

  @HostListener('document:keydown.arrowleft')
  onLeft(): void {
    this.nav.prev();
  }

  @HostListener('document:keydown.arrowright')
  onRight(): void {
    this.nav.next();
  }

  parseDescription(description: string): DescriptionBlock[] {
    const blocks: DescriptionBlock[] = [];
    for (const line of description.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      blocks.push(
        trimmed.startsWith('- ')
          ? { type: 'bullet', text: trimmed.slice(2).trim() }
          : { type: 'heading', text: trimmed },
      );
    }
    return blocks;
  }
}
