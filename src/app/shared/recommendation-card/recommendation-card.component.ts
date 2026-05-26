import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  HostListener,
  inject,
  Input,
  OnInit,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { LiquidGlassPanelComponent } from '../liquid-glass';

@Component({
  selector: 'app-recommendation-card',
  standalone: true,
  imports: [LiquidGlassPanelComponent],
  templateUrl: './recommendation-card.component.html',
  styleUrl: './recommendation-card.component.scss',
  host: {
    class: 'recommendation-card',
    '[class.recommendation-card--expanded]': 'expanded()',
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
  },
})
export class RecommendationCardComponent implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);

  @Input({ required: true }) name!: string;
  @Input({ required: true }) role!: string;
  @Input({ required: true }) quote!: string;
  @Input({ required: true }) avatarSrc!: string;
  @Input({ required: true }) linkedInUrl!: string;

  readonly expanded = signal(false);

  private hoverCapable = false;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.hoverCapable = window.matchMedia('(hover: hover)').matches;
    }
  }

  get linkedInLabel(): string {
    return `${this.name} on LinkedIn`;
  }

  onMouseEnter(): void {
    if (this.hoverCapable) {
      this.expanded.set(true);
    }
  }

  onMouseLeave(): void {
    if (this.hoverCapable) {
      this.expanded.set(false);
    }
  }

  @HostListener('click', ['$event'])
  onHostClick(event: MouseEvent): void {
    if (this.hoverCapable) {
      return;
    }
    const target = event.target as HTMLElement;
    if (target.closest('a')) {
      return;
    }
    this.expanded.update((value) => !value);
  }
}
