import { Component } from '@angular/core';
import { PORTFOLIO_DATA } from '../../core/data/portfolio.data';
import { SectionHeaderComponent } from '../../layout/section-header/section-header.component';
import { RecommendationCardComponent } from '../../shared/recommendation-card/recommendation-card.component';

@Component({
  selector: 'app-reference',
  standalone: true,
  imports: [SectionHeaderComponent, RecommendationCardComponent],
  templateUrl: './reference.component.html',
  styleUrl: './reference.component.scss',
})
export class ReferenceComponent {
  readonly testimonial = PORTFOLIO_DATA.testimonials[0];
}
