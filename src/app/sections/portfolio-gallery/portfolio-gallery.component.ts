import { Component, inject } from '@angular/core';
import { PORTFOLIO_DATA } from '../../core/data/portfolio.data';
import { PortfolioItem } from '../../core/models/portfolio.models';
import { SectionHeaderComponent } from '../../layout/section-header/section-header.component';
import { RevealDirective } from '../../shared/reveal/reveal.directive';
import { PortfolioNavigationService } from '../../core/services/portfolio-navigation.service';
import { FitOverlayDirective } from './fit-overlay.directive';

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

  open(item: PortfolioItem): void {
    this.nav.open(item);
  }
}
