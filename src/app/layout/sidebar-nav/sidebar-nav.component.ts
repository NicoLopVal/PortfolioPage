import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  inject,
  OnDestroy,
  signal,
  ViewChild,
} from '@angular/core';
import { NAV_SECTIONS, PORTFOLIO_DATA } from '../../core/data/portfolio.data';
import { ThemeToggleComponent } from '../../shared/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-sidebar-nav',
  standalone: true,
  imports: [ThemeToggleComponent],
  templateUrl: './sidebar-nav.component.html',
  styleUrl: './sidebar-nav.component.scss',
})
export class SidebarNavComponent implements AfterViewInit, OnDestroy {
  private readonly host = inject(ElementRef);

  @ViewChild('navList') private navListRef!: ElementRef<HTMLUListElement>;

  readonly sections  = NAV_SECTIONS;
  readonly brandName =
    PORTFOLIO_DATA.profile.firstName + ' ' + PORTFOLIO_DATA.profile.lastName;

  activeSectionId = 'about';

  readonly menuOpen      = signal(false);
  readonly drawerVisible = signal(false);
  readonly drawerClosing = signal(false);
  readonly useHamburger  = signal(false);

  // ── Cached measurements ───────────────────────────────────────────────────
  //
  // _controlsWidth : width of the controls block captured BEFORE the hamburger
  //                  button is ever added (= theme-toggle only).  Used for the
  //                  "would links fit?" check when in hamburger mode.
  //
  // _naturalNavWidth: nav.scrollWidth captured the moment we switch TO hamburger.
  //                   At that instant the nav is still in the flex flow and its
  //                   scrollWidth equals the natural content width of the items
  //                   (because the <li>s have flex-shrink:0 and overflow the nav).
  //                   Stored so the switch-back branch can use it while the nav
  //                   is collapsed (width:0, clientWidth === 0).

  private _controlsWidth   = 0;
  private _naturalNavWidth = 0;

  private closeTimer?:      ReturnType<typeof setTimeout>;
  private sectionObserver?: IntersectionObserver;
  private resizeObserver?:  ResizeObserver;

  // ── Lifecycle ─────────────────────────────────────────────────────────────

  ngAfterViewInit(): void {
    // Active-section tracking
    this.sectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) this.activeSectionId = entry.target.id;
        }
      },
      { root: null, rootMargin: '-40% 0px -50% 0px', threshold: 0 },
    );
    for (const section of this.sections) {
      const el = document.getElementById(section.id);
      if (el) this.sectionObserver.observe(el);
    }

    // Wait for web fonts so all text widths are stable before measuring.
    const start = () => {
      const host     = this.host.nativeElement as HTMLElement;
      const controls = host.querySelector('.top-nav__controls') as HTMLElement | null;
      const ul       = this.navListRef?.nativeElement;

      // Capture controls width NOW — before any hamburger button can appear.
      this._controlsWidth = controls?.offsetWidth ?? 0;

      // Observe the host (window-resize proxy) AND the nav list (font/content
      // changes can alter item widths without changing the host width).
      this.resizeObserver = new ResizeObserver(() => this.checkOverflow());
      this.resizeObserver.observe(host);
      if (ul) this.resizeObserver.observe(ul);

      this.checkOverflow();
    };

    if (document.fonts?.ready) {
      document.fonts.ready.then(start);
    } else {
      setTimeout(start);
    }
  }

  ngOnDestroy(): void {
    this.sectionObserver?.disconnect();
    this.resizeObserver?.disconnect();
    clearTimeout(this.closeTimer);
  }

  // ── Overflow detection ────────────────────────────────────────────────────
  //
  // Two-branch strategy — each branch uses a measurement that is valid in
  // that particular state:
  //
  //  Links visible (nav in flex flow, overflow:hidden):
  //    • <li> items have flex-shrink:0, so they never shrink.
  //    • When the flex layout squeezes the <nav> below the items' natural
  //      width, the items overflow the nav.
  //    • nav.scrollWidth (content width including hidden overflow) stays at
  //      the natural size; nav.clientWidth shrinks with the layout.
  //    • → nav.scrollWidth > nav.clientWidth + 1  means "items don't fit".
  //    • We cache nav.scrollWidth as _naturalNavWidth for the other branch.
  //
  //  Hamburger active (nav collapsed to width:0):
  //    • nav.clientWidth === 0, so the scrollWidth check is always true —
  //      useless here.
  //    • Instead compute the space that WOULD be available for the nav if
  //      links were shown (host − padding − brand − controls-without-hamburger).
  //    • Compare that available space to the cached _naturalNavWidth.

  private checkOverflow(): void {
    const host  = this.host.nativeElement as HTMLElement;
    const navEl = host.querySelector('nav') as HTMLElement | null;
    const brand = host.querySelector('.top-nav__brand') as HTMLElement | null;
    if (!navEl || !brand) return;

    let shouldHamburger: boolean;

    if (!this.useHamburger()) {
      // ── Links are visible ────────────────────────────────────────────────
      // scrollWidth reflects natural content width; clientWidth is the
      // rendered (possibly-squeezed) width given by the flex layout.
      shouldHamburger = navEl.scrollWidth > navEl.clientWidth + 1;

      if (shouldHamburger) {
        // Cache the natural width while the nav is still in flow.
        this._naturalNavWidth = navEl.scrollWidth;
      }
    } else {
      // ── Hamburger is active ──────────────────────────────────────────────
      if (!this._naturalNavWidth) return; // not yet measured — stay as-is

      const style     = getComputedStyle(host);
      const hPad      = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
      // Space available for the nav assuming links are shown (no hamburger).
      // _controlsWidth was captured before the hamburger ever appeared, so it
      // represents the controls-only width — exactly the target state.
      const available = host.clientWidth - hPad - brand.offsetWidth - this._controlsWidth;

      // Require 16 px of extra room before restoring links (hysteresis prevents
      // rapid toggling right at the threshold).
      shouldHamburger = available < this._naturalNavWidth + 16;
    }

    if (shouldHamburger === this.useHamburger()) return; // nothing changed
    this.useHamburger.set(shouldHamburger);
    if (!shouldHamburger) this.closeMenuImmediate();
  }

  // ── Drawer open / close ───────────────────────────────────────────────────

  toggleMenu(): void {
    if (this.menuOpen()) this.closeMenu();
    else this.openMenu();
  }

  private openMenu(): void {
    clearTimeout(this.closeTimer);
    this.drawerClosing.set(false);
    this.drawerVisible.set(true);
    this.menuOpen.set(true);
  }

  closeMenu(): void {
    if (!this.drawerVisible()) return;
    this.menuOpen.set(false);
    this.drawerClosing.set(true);
    this.closeTimer = setTimeout(() => {
      this.drawerVisible.set(false);
      this.drawerClosing.set(false);
    }, 240);
  }

  private closeMenuImmediate(): void {
    clearTimeout(this.closeTimer);
    this.menuOpen.set(false);
    this.drawerVisible.set(false);
    this.drawerClosing.set(false);
  }

  // ── Navigation ────────────────────────────────────────────────────────────

  scrollTo(sectionId: string): void {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.activeSectionId = sectionId;
    }
    this.closeMenu();
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.closeMenu();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(e: MouseEvent): void {
    if (this.menuOpen() && !this.host.nativeElement.contains(e.target as Node)) {
      this.closeMenu();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void { this.closeMenu(); }
}
