import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PORTFOLIO_DATA } from '../data/portfolio.data';
import { PortfolioItem } from '../models/portfolio.models';

@Injectable({ providedIn: 'root' })
export class PortfolioNavigationService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly items = PORTFOLIO_DATA.portfolio;

  // ── Private index drives everything ───────────────────────────────────────
  private readonly _selectedIndex = signal<number>(-1);

  // ── Public state ──────────────────────────────────────────────────────────

  /** The item currently being displayed (stays set during the leave animation). */
  readonly selectedItem = computed<PortfolioItem | null>(() => {
    const i = this._selectedIndex();
    return i >= 0 ? this.items[i] : null;
  });

  /** True while the detail page is visible (including enter animation). */
  readonly isOpen = signal(false);

  /** True only during the leave animation so the detail can play its exit. */
  readonly closing = signal(false);

  readonly hasPrev = computed(() => this._selectedIndex() > 0);
  readonly hasNext = computed(() => this._selectedIndex() < this.items.length - 1);
  readonly currentNumber = computed(() => this._selectedIndex() + 1);
  readonly totalItems = this.items.length;
  readonly totalItemsArray = this.items.map((_, i) => i);
  readonly currentIndex = computed(() => this._selectedIndex());

  // ── Actions ───────────────────────────────────────────────────────────────

  open(item: PortfolioItem): void {
    const idx = this.items.findIndex((i) => i.id === item.id);
    if (idx === -1) return;
    this._selectedIndex.set(idx);
    this.isOpen.set(true);
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = 'hidden';
    }
  }

  /**
   * Starts the close sequence:
   *  1. isOpen → false   → main page begins sliding back immediately.
   *  2. closing → true   → detail begins sliding out simultaneously.
   *  3. After 480 ms     → selectedItem cleared, detail removed from DOM.
   */
  close(): void {
    this.isOpen.set(false);
    this.closing.set(true);
    setTimeout(() => {
      this._selectedIndex.set(-1);
      this.closing.set(false);
      if (isPlatformBrowser(this.platformId)) {
        document.body.style.overflow = '';
      }
    }, 480);
  }

  prev(): void {
    if (this.hasPrev()) {
      this._selectedIndex.update((i) => i - 1);
    }
  }

  next(): void {
    if (this.hasNext()) {
      this._selectedIndex.update((i) => i + 1);
    }
  }

  goTo(index: number): void {
    if (index >= 0 && index < this.items.length) {
      this._selectedIndex.set(index);
    }
  }
}
