import {
  AfterViewInit,
  Directive,
  ElementRef,
  NgZone,
  OnDestroy,
  inject,
} from '@angular/core';

/**
 * Drops the tile's subtitle (tagline) when the title + subtitle + skills don't
 * all fit inside the card, so nothing gets clipped. Re-evaluates on resize and
 * after web fonts load. Applied to the `.portfolio-gallery__overlay` element,
 * which wraps a `.portfolio-gallery__overlay-content` block.
 */
@Directive({
  selector: '[appFitOverlay]',
  standalone: true,
})
export class FitOverlayDirective implements AfterViewInit, OnDestroy {
  private static readonly HIDE_CLASS =
    'portfolio-gallery__overlay--hide-subtitle';

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly zone = inject(NgZone);

  private resizeObserver?: ResizeObserver;
  private rafId = 0;

  ngAfterViewInit(): void {
    // DOM measurement only — no need to run inside Angular's zone.
    this.zone.runOutsideAngular(() => {
      this.resizeObserver = new ResizeObserver(() => this.schedule());
      this.resizeObserver.observe(this.host.nativeElement);

      // Font swaps change text height, so re-check once fonts are ready.
      document.fonts?.ready.then(() => this.schedule());

      this.schedule();
    });
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    cancelAnimationFrame(this.rafId);
  }

  private schedule(): void {
    cancelAnimationFrame(this.rafId);
    this.rafId = requestAnimationFrame(() => this.check());
  }

  private check(): void {
    const overlay = this.host.nativeElement;
    const content = overlay.querySelector<HTMLElement>(
      '.portfolio-gallery__overlay-content',
    );
    if (!content) return;

    // Always measure from the "everything shown" state, then decide — this lets
    // the subtitle come back if the card grows again.
    overlay.classList.remove(FitOverlayDirective.HIDE_CLASS);

    const style = getComputedStyle(overlay);
    const verticalPadding =
      parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
    const available = overlay.clientHeight - verticalPadding;

    if (content.scrollHeight > available + 1) {
      overlay.classList.add(FitOverlayDirective.HIDE_CLASS);
    }
  }
}
