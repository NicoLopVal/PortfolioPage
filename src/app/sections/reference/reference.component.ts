import { Component } from '@angular/core';
import { PORTFOLIO_DATA } from '../../core/data/portfolio.data';
import { SectionHeaderComponent } from '../../layout/section-header/section-header.component';
import { RevealDirective } from '../../shared/reveal/reveal.directive';
import { RecommendationCarouselComponent } from '../../shared/recommendation-carousel/recommendation-carousel.component';

@Component({
  selector: 'app-reference',
  standalone: true,
  imports: [SectionHeaderComponent, RecommendationCarouselComponent, RevealDirective],
  templateUrl: './reference.component.html',
  styleUrl: './reference.component.scss',
})
export class ReferenceComponent {
  readonly testimonials = PORTFOLIO_DATA.testimonials;
}
