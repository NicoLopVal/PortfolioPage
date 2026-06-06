import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  inject,
  OnDestroy,
  signal,
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

  readonly sections = NAV_SECTIONS;
  readonly brandName =
    PORTFOLIO_DATA.profile.firstName + ' ' + PORTFOLIO_DATA.profile.lastName;

  activeSectionId = 'about';
  readonly menuOpen = signal(false);

  private observer?: IntersectionObserver;

  // ── IntersectionObserver — active section tracking ──────────────────────

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.activeSectionId = entry.target.id;
          }
        }
      },
      { root: null, rootMargin: '-40% 0px -50% 0px', threshold: 0 },
    );

    for (const section of this.sections) {
      const el = document.getElementById(section.id);
      if (el) this.observer.observe(el);
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  // ── Actions ──────────────────────────────────────────────────────────────

  scrollTo(sectionId: string): void {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.activeSectionId = sectionId;
    }
    this.menuOpen.set(false);
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.menuOpen.set(false);
  }

  toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }

  // Close the mobile drawer when clicking outside the nav
  @HostListener('document:click', ['$event'])
  onDocumentClick(e: MouseEvent): void {
    if (
      this.menuOpen() &&
      !this.host.nativeElement.contains(e.target as Node)
    ) {
      this.menuOpen.set(false);
    }
  }

  // Close on Escape
  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.menuOpen.set(false);
  }
}
