import { Component, HostListener, inject, signal } from '@angular/core';
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
  readonly slideDir = signal<'prev' | 'next' | null>(null);

  private slideTimer: ReturnType<typeof setTimeout> | null = null;

  private slide(dir: 'prev' | 'next', action: () => void): void {
    if (this.slideTimer) clearTimeout(this.slideTimer);
    action();
    this.slideDir.set(dir);
    this.slideTimer = setTimeout(() => this.slideDir.set(null), 380);
  }

  goPrev(): void { this.slide('prev', () => this.nav.prev()); }
  goNext(): void { this.slide('next', () => this.nav.next()); }
  goToItem(i: number): void {
    if (i === this.nav.currentIndex()) return;
    const dir = i > this.nav.currentIndex() ? 'next' : 'prev';
    this.slide(dir, () => this.nav.goTo(i));
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (!this.nav.closing()) this.nav.close();
  }

  @HostListener('document:keydown.arrowleft')
  onLeft(): void { this.goPrev(); }

  @HostListener('document:keydown.arrowright')
  onRight(): void { this.goNext(); }

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
