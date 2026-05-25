import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  inject,
} from '@angular/core';
import { NAV_SECTIONS } from '../../core/data/portfolio.data';

@Component({
  selector: 'app-sidebar-nav',
  standalone: true,
  templateUrl: './sidebar-nav.component.html',
  styleUrl: './sidebar-nav.component.scss',
})
export class SidebarNavComponent implements AfterViewInit, OnDestroy {
  private readonly host = inject(ElementRef);
  readonly sections = NAV_SECTIONS;
  activeSectionId = 'about';
  menuOpen = false;

  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '-40% 0px -50% 0px',
      threshold: 0,
    };

    this.observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          this.activeSectionId = entry.target.id;
        }
      }
    }, options);

    for (const section of this.sections) {
      const el = document.getElementById(section.id);
      if (el) {
        this.observer.observe(el);
      }
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  scrollTo(sectionId: string): void {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.activeSectionId = sectionId;
      this.menuOpen = false;
    }
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }
}
