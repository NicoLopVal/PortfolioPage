import {
  Component,
  DestroyRef,
  NgZone,
  PLATFORM_ID,
  computed,
  inject,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PORTFOLIO_DATA } from '../../core/data/portfolio.data';
import { PortfolioItem } from '../../core/models/portfolio.models';
import { SectionHeaderComponent } from '../../layout/section-header/section-header.component';
import { RevealDirective } from '../../shared/reveal/reveal.directive';
import { PortfolioNavigationService } from '../../core/services/portfolio-navigation.service';
import { FitOverlayDirective } from './fit-overlay.directive';
import { layoutTiles } from './tile-layout';

/** Middle position is the union of both sides, so the control reads as a
 *  three-position toggle rather than three unrelated filters. */
export type TrackFilter = 'or-sim' | 'all' | 'software';

/** Must stay in step with $tablet / $mobile in styles/_mixins.scss. The column
 *  count is decided here rather than in a media query so the packing algorithm
 *  and the rendered grid can never disagree about how wide the grid is. */
const TABLET_MAX = 992;
const MOBILE_MAX = 768;

@Component({
  selector: 'app-portfolio-gallery',
  standalone: true,
  imports: [SectionHeaderComponent, FitOverlayDirective, RevealDirective],
  templateUrl: './portfolio-gallery.component.html',
  styleUrl: './portfolio-gallery.component.scss',
})
export class PortfolioGalleryComponent {
  readonly data = PORTFOLIO_DATA;
  private readonly nav = inject(PortfolioNavigationService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private readonly zone = inject(NgZone);

  readonly filters: { value: TrackFilter; label: string }[] = [
    { value: 'or-sim', label: 'OR & Simulation' },
    { value: 'all', label: 'All' },
    { value: 'software', label: 'Software' },
  ];

  readonly filter = signal<TrackFilter>('all');
  readonly columns = signal(3);

  private readonly visibleItems = computed(() => {
    const track = this.filter();
    if (track === 'all') return this.data.portfolio;
    return this.data.portfolio.filter((item) => item.tracks.includes(track));
  });

  /** Projects paired with the footprint they actually get — see tile-layout.ts. */
  readonly tiles = computed(() => layoutTiles(this.visibleItems(), this.columns()));

  constructor() {
    if (!isPlatformBrowser(this.platformId)) return;

    const measure = () => {
      const w = window.innerWidth;
      return w <= MOBILE_MAX ? 1 : w <= TABLET_MAX ? 2 : 3;
    };
    this.columns.set(measure());

    // Listen outside Angular and only re-enter when the count actually changes,
    // so dragging a window edge doesn't run change detection on every pixel.
    this.zone.runOutsideAngular(() => {
      const sync = () => {
        const next = measure();
        if (next !== this.columns()) this.zone.run(() => this.columns.set(next));
      };
      window.addEventListener('resize', sync);
      this.destroyRef.onDestroy(() => window.removeEventListener('resize', sync));
    });
  }

  setFilter(value: TrackFilter): void {
    this.filter.set(value);
  }

  open(item: PortfolioItem): void {
    this.nav.open(item);
  }
}
