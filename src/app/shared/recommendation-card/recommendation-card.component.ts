import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
  Input,
  OnDestroy,
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
export class RecommendationCardComponent implements OnInit, OnDestroy {
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
  private viewportListener: (() => void) | null = null;
  private outsidePointerListener: ((event: PointerEvent) => void) | null = null;

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
      'z-index': '50',
    };
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.hoverCapable = window.matchMedia('(hover: hover)').matches;
    }
  }

  ngOnDestroy(): void {
    this.unbindViewportTracking();
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
    this.dismiss();
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
    const nextExpanded = !this.expanded();
    this.expanded.set(nextExpanded);
    if (nextExpanded && this.inCarousel) {
      this.captureOverlayRect();
      this.bindViewportTracking();
      this.bindOutsidePointerTracking();
    } else {
      this.overlayRect.set(null);
      this.unbindViewportTracking();
      this.unbindOutsidePointerTracking();
    }
  }

  private syncExpandState(): void {
    const quoteEl = this.elementRef.nativeElement.querySelector(
      '.recommendation-card__quote',
    ) as HTMLElement | null;

    if (!quoteEl) {
      this.dismiss();
      return;
    }

    const overflows = quoteEl.scrollHeight > quoteEl.clientHeight + 1;

    if (this.inCarousel) {
      this.expanded.set(overflows);
      if (overflows) {
        this.captureOverlayRect();
        this.bindViewportTracking();
      } else {
        this.overlayRect.set(null);
        this.unbindViewportTracking();
      }
      return;
    }

    this.expanded.set(true);
  }

  private dismiss(): void {
    this.hovered.set(false);
    this.expanded.set(false);
    this.overlayRect.set(null);
    this.unbindViewportTracking();
    this.unbindOutsidePointerTracking();
  }

  private onViewportChange(): void {
    if (!this.expanded() || !this.inCarousel) {
      return;
    }

    const slide = this.getSlideElement();
    const section = this.getReferenceSectionElement();
    if (!slide || !section) {
      this.dismiss();
      return;
    }

    if (!this.isAnchorInsideSection(slide, section)) {
      this.dismiss();
      return;
    }

    this.captureOverlayRect();
  }

  private isAnchorInsideSection(slide: Element, section: Element): boolean {
    const slideRect = slide.getBoundingClientRect();
    const sectionRect = section.getBoundingClientRect();

    return (
      slideRect.top >= sectionRect.top &&
      slideRect.top < sectionRect.bottom &&
      slideRect.left < sectionRect.right &&
      slideRect.right > sectionRect.left
    );
  }

  private captureOverlayRect(): void {
    const slide = this.getSlideElement();
    if (!slide) {
      return;
    }
    const { top, left, width } = slide.getBoundingClientRect();
    this.overlayRect.set({ top, left, width });
  }

  private getSlideElement(): Element | null {
    return this.elementRef.nativeElement.closest('.recommendation-carousel__slide');
  }

  private getReferenceSectionElement(): Element | null {
    return this.elementRef.nativeElement.closest('.reference');
  }

  private bindViewportTracking(): void {
    if (!isPlatformBrowser(this.platformId) || this.viewportListener) {
      return;
    }

    this.viewportListener = () => this.onViewportChange();
    window.addEventListener('scroll', this.viewportListener, {
      passive: true,
      capture: true,
    });
    window.addEventListener('resize', this.viewportListener, { passive: true });
  }

  private unbindViewportTracking(): void {
    if (!this.viewportListener) {
      return;
    }

    window.removeEventListener('scroll', this.viewportListener, { capture: true });
    window.removeEventListener('resize', this.viewportListener);
    this.viewportListener = null;
  }

  private bindOutsidePointerTracking(): void {
    if (!isPlatformBrowser(this.platformId) || this.outsidePointerListener) {
      return;
    }

    this.outsidePointerListener = (event: PointerEvent) => {
      if (!this.expanded() || !this.inCarousel) {
        return;
      }

      const hostEl = this.elementRef.nativeElement;
      const target = event.target as Node | null;
      if (target && hostEl.contains(target)) {
        return;
      }

      this.dismiss();
    };

    document.addEventListener('pointerdown', this.outsidePointerListener, {
      capture: true,
    });
  }

  private unbindOutsidePointerTracking(): void {
    if (!this.outsidePointerListener || !isPlatformBrowser(this.platformId)) {
      return;
    }

    document.removeEventListener('pointerdown', this.outsidePointerListener, {
      capture: true,
    });
    this.outsidePointerListener = null;
  }
}
