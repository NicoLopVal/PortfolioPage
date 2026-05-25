import { Component } from '@angular/core';
import { PORTFOLIO_DATA } from '../../core/data/portfolio.data';
import { SectionHeaderComponent } from '../../layout/section-header/section-header.component';

@Component({
  selector: 'app-reference',
  standalone: true,
  imports: [SectionHeaderComponent],
  templateUrl: './reference.component.html',
  styleUrl: './reference.component.scss',
})
export class ReferenceComponent {
  readonly data = PORTFOLIO_DATA;
  readonly testimonial = PORTFOLIO_DATA.testimonials[0];
}
