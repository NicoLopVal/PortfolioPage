import {
  Directive,
  ElementRef,
  inject,
  Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Scroll-reveal: hides the element until it enters the viewport, then plays a
 * fade-and-rise (styles live in styles/_motion.scss).
 *
 * Modes:
 *  - `appReveal`            → the element reveals as one block.
 *  - `appReveal="stagger"`  → the element stays put; its direct children
 *                             cascade in one after another.
 *
 * Reveals exactly once (unobserves after firing). Honours reduced-motion and
 * missing IntersectionObserver by revealing immediately.
 */
@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealDirective implements OnInit, OnDestroy {
  @Input('appReveal') mode: '' | 'stagger' = '';

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly platformId = inject(PLATFORM_ID);
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const node = this.el.nativeElement;
    node.classList.add(this.mode === 'stagger' ? 'reveal--stagger' : 'reveal');

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion || !('IntersectionObserver' in window)) {
      node.classList.add('is-revealed');
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            node.classList.add('is-revealed');
            this.observer?.disconnect();
            this.observer = undefined;
          }
        }
      },
      // Fire once ~40px of the element has scrolled into view.
      { threshold: 0, rootMargin: '0px 0px -40px 0px' },
    );
    this.observer.observe(node);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
