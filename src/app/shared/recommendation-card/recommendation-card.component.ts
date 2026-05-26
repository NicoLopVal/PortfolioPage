import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
  Input,
  OnInit,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { LiquidGlassPanelComponent } from '../liquid-glass';

interface OverlayRect {
  top: number;
  left: number;
  width: number;
}

@Component({
  selector: 'app-recommendation-card',
  standalone: true,
  imports: [LiquidGlassPanelComponent],
  templateUrl: './recommendation-card.component.html',
  styleUrl: './recommendation-card.component.scss',
  host: {
    class: 'recommendation-card',
    '[class.recommendation-card--hovered]': 'hovered()',
    '[class.recommendation-card--expanded]': 'expanded()',
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
  },
})
export class RecommendationCardComponent implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  @Input({ required: true }) name!: string;
  @Input({ required: true }) role!: string;
  @Input({ required: true }) quote!: string;
  @Input({ required: true }) avatarSrc!: string;
  @Input({ required: true }) linkedInUrl!: string;
  @Input() inCarousel = false;

  readonly hovered = signal(false);
  readonly expanded = signal(false);

  private readonly overlayRect = signal<OverlayRect | null>(null);
  private hoverCapable = false;

  @HostBinding('style')
  get hostStyles(): Record<string, string> | null {
    if (!this.inCarousel || !this.expanded()) {
      return null;
    }
    const rect = this.overlayRect();
    if (!rect) {
      return null;
    }
    return {
      position: 'fixed',
      top: `${rect.top}px`,
      left: `${rect.left}px`,
      width: `${rect.width}px`,
      'z-index': '100',
    };
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.hoverCapable = window.matchMedia('(hover: hover)').matches;
    }
  }

  get linkedInLabel(): string {
    return `${this.name} on LinkedIn`;
  }

  onMouseEnter(): void {
    if (!this.hoverCapable) {
      return;
    }
    this.hovered.set(true);
    requestAnimationFrame(() => this.syncExpandState());
  }

  onMouseLeave(): void {
    if (!this.hoverCapable) {
      return;
    }
    this.hovered.set(false);
    this.expanded.set(false);
    this.overlayRect.set(null);
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
    if (this.expanded() && this.inCarousel) {
      this.captureOverlayRect();
    } else {
      this.overlayRect.set(null);
    }
  }

  private syncExpandState(): void {
    const quoteEl = this.elementRef.nativeElement.querySelector(
      '.recommendation-card__quote',
    ) as HTMLElement | null;

    if (!quoteEl) {
      this.expanded.set(false);
      this.overlayRect.set(null);
      return;
    }

    const overflows = quoteEl.scrollHeight > quoteEl.clientHeight + 1;

    if (this.inCarousel) {
      this.expanded.set(overflows);
      if (overflows) {
        this.captureOverlayRect();
      } else {
        this.overlayRect.set(null);
      }
      return;
    }

    this.expanded.set(true);
  }

  private captureOverlayRect(): void {
    const { top, left, width } = this.elementRef.nativeElement.getBoundingClientRect();
    this.overlayRect.set({ top, left, width });
  }
}
