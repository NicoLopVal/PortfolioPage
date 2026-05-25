import { Component } from '@angular/core';
import { PORTFOLIO_DATA } from '../../core/data/portfolio.data';
import { SectionHeaderComponent } from '../../layout/section-header/section-header.component';

@Component({
  selector: 'app-portfolio-gallery',
  standalone: true,
  imports: [SectionHeaderComponent],
  templateUrl: './portfolio-gallery.component.html',
  styleUrl: './portfolio-gallery.component.scss',
})
export class PortfolioGalleryComponent {
  readonly data = PORTFOLIO_DATA;
}
