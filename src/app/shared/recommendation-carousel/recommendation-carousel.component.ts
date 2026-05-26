import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  inject,
  Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { Testimonial } from '../../core/models/portfolio.models';
import { RecommendationCardComponent } from '../recommendation-card/recommendation-card.component';

const DEFAULT_CARD_WIDTH = 400;
const STEP_TRANSITION_MS = 300;

@Component({
  selector: 'app-recommendation-carousel',
  standalone: true,
  imports: [RecommendationCardComponent],
  templateUrl: './recommendation-carousel.component.html',
  styleUrl: './recommendation-carousel.component.scss',
})
export class RecommendationCarouselComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);

  @Input({ required: true }) testimonials!: Testimonial[];
  @Input() autoScrollPxPerSecond = 28;
  @Input() gapPx = 24;

  @ViewChild('carouselRoot') carouselRootRef?: ElementRef<HTMLElement>;
  @ViewChild('viewport') viewportRef?: ElementRef<HTMLElement>;
  @ViewChild('track') trackRef?: ElementRef<HTMLElement>;

  @HostBinding('style.--carousel-card-width')
  cardWidthCss = `${DEFAULT_CARD_WIDTH}px`;

  @HostBinding('style.--carousel-gap')
  gapCss = '24px';

  @HostBinding('style.--carousel-slide-height')
  slideHeightCss = '270px';

  displayItems: Testimonial[] = [];
  offsetPx = 0;
  trackTransition = 'none';
  visibleCount = 1;

  private cardWidthPx = DEFAULT_CARD_WIDTH;
  private setWidthPx = 0;
  private stepPx = 0;
  private paused = false;
  private pointerInCarousel = false;
  private pointerOverCard = false;
  private lastPointerX: number | null = null;
  private lastPointerY: number | null = null;
  private touchActive = false;
  private focusInside = false;
  private stepping = false;
  private autoScrollEnabled = true;
  private rafId: number | null = null;
  private lastFrameTime = 0;
  private resizeObserver: ResizeObserver | null = null;
  private reducedMotionQuery: MediaQueryList | null = null;
  private reducedMotionListener: ((event: MediaQueryListEvent) => void) | null = null;
  private stepTimeoutId: ReturnType<typeof setTimeout> | null = null;

  ngOnInit(): void {
    if (this.testimonials.length > 0) {
      this.displayItems = [...this.testimonials, ...this.testimonials];
    }
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId) || this.testimonials.length === 0) {
      return;
    }

    this.gapCss = `${this.gapPx}px`;
    this.offsetPx = Math.random() * this.estimateSetWidth();

    this.reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.autoScrollEnabled = !this.reducedMotionQuery.matches;
    this.reducedMotionListener = () => {
      this.autoScrollEnabled = !this.reducedMotionQuery!.matches;
    };
    this.reducedMotionQuery.addEventListener('change', this.reducedMotionListener);

    this.setupResizeObserver();
    this.lastFrameTime = performance.now();
    this.tick(this.lastFrameTime);
  }

  ngOnDestroy(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
    }
    this.resizeObserver?.disconnect();
    if (this.reducedMotionQuery && this.reducedMotionListener) {
      this.reducedMotionQuery.removeEventListener('change', this.reducedMotionListener);
    }
    if (this.stepTimeoutId !== null) {
      clearTimeout(this.stepTimeoutId);
    }
  }

  trackByIndex(index: number): number {
    return index;
  }

  onCarouselMouseMove(event: MouseEvent): void {
    this.pointerInCarousel = true;
    this.lastPointerX = event.clientX;
    this.lastPointerY = event.clientY;
    this.pointerOverCard = this.isPointerOverRecommendationCard();
    this.updatePausedState();
  }

  onCarouselMouseLeave(): void {
    this.pointerInCarousel = false;
    this.lastPointerX = null;
    this.lastPointerY = null;
    this.pointerOverCard = false;
    this.updatePausedState();
  }

  onTouchStart(): void {
    this.touchActive = true;
    this.updatePausedState();
  }

  onTouchEnd(): void {
    this.touchActive = false;
    this.updatePausedState();
  }

  onFocusOut(event: FocusEvent): void {
    const root = this.viewportRef?.nativeElement.closest('.recommendation-carousel');
    const related = event.relatedTarget as Node | null;
    if (root && related && root.contains(related)) {
      return;
    }
    this.focusInside = false;
    this.updatePausedState();
  }

  onFocusIn(): void {
    this.focusInside = true;
    this.updatePausedState();
  }

  step(direction: -1 | 1): void {
    if (this.stepping || this.setWidthPx <= 0) {
      return;
    }

    this.stepping = true;
    this.trackTransition = `left ${STEP_TRANSITION_MS}ms ease`;
    this.offsetPx += direction * this.stepPx;
    this.updatePausedState();

    const trackEl = this.trackRef?.nativeElement;
    const finishStep = (): void => {
      if (this.stepTimeoutId !== null) {
        clearTimeout(this.stepTimeoutId);
        this.stepTimeoutId = null;
      }
      trackEl?.removeEventListener('transitionend', onTransitionEnd);
      this.trackTransition = 'none';
      this.normalizeOffset();
      this.stepping = false;
      this.updatePausedState();
    };

    const onTransitionEnd = (event: TransitionEvent): void => {
      if (event.propertyName !== 'left') {
        return;
      }
      finishStep();
    };

    if (trackEl) {
      trackEl.addEventListener('transitionend', onTransitionEnd);
    }
    this.stepTimeoutId = setTimeout(finishStep, STEP_TRANSITION_MS + 50);
  }

  private tick(now: number): void {
    const deltaMs = Math.min(now - this.lastFrameTime, 50);
    this.lastFrameTime = now;

    this.pointerOverCard = this.isPointerOverRecommendationCard();
    this.updatePausedState();

    if (!this.paused && this.autoScrollEnabled && this.setWidthPx > 0) {
      this.offsetPx += (this.autoScrollPxPerSecond * deltaMs) / 1000;
      if (this.offsetPx >= this.setWidthPx) {
        this.offsetPx -= this.setWidthPx;
      }
    }

    this.rafId = requestAnimationFrame((time) => this.tick(time));
  }

  private setupResizeObserver(): void {
    const viewport = this.viewportRef?.nativeElement;
    if (!viewport) {
      return;
    }

    this.resizeObserver = new ResizeObserver(() => this.measureLayout());
    this.resizeObserver.observe(viewport);
    this.measureLayout();
  }

  private measureLayout(): void {
    const viewport = this.viewportRef?.nativeElement;
    if (!viewport || this.testimonials.length === 0) {
      return;
    }

    const viewportWidth = viewport.clientWidth;
    const maxCardWidth = DEFAULT_CARD_WIDTH;
    const fitCount = Math.max(
      1,
      Math.floor((viewportWidth + this.gapPx) / (maxCardWidth + this.gapPx)),
    );
    this.visibleCount = fitCount;

    const computedCardWidth =
      fitCount === 1
        ? Math.min(maxCardWidth, viewportWidth)
        : (viewportWidth - (fitCount - 1) * this.gapPx) / fitCount;

    this.cardWidthPx = Math.max(280, computedCardWidth);
    this.cardWidthCss = `${this.cardWidthPx}px`;
    this.stepPx = this.cardWidthPx + this.gapPx;
    this.setWidthPx = this.testimonials.length * this.stepPx - this.gapPx;

    if (this.setWidthPx > 0) {
      this.normalizeOffset();
    }
  }

  private estimateSetWidth(): number {
    const step = DEFAULT_CARD_WIDTH + this.gapPx;
    return this.testimonials.length * step - this.gapPx;
  }

  private normalizeOffset(): void {
    if (this.setWidthPx <= 0) {
      return;
    }
    while (this.offsetPx >= this.setWidthPx) {
      this.offsetPx -= this.setWidthPx;
    }
    while (this.offsetPx < 0) {
      this.offsetPx += this.setWidthPx;
    }
  }

  private isPointerOverRecommendationCard(): boolean {
    if (
      !this.pointerInCarousel ||
      this.lastPointerX === null ||
      this.lastPointerY === null
    ) {
      return false;
    }

    const root = this.carouselRootRef?.nativeElement;
    if (!root) {
      return false;
    }

    const element = document.elementFromPoint(this.lastPointerX, this.lastPointerY);
    if (!element || !root.contains(element)) {
      return false;
    }

    return !!element.closest('.recommendation-card');
  }

  private updatePausedState(): void {
    this.paused =
      this.pointerOverCard ||
      this.touchActive ||
      this.focusInside ||
      this.stepping;
  }
}
