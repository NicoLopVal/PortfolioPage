import { Component } from '@angular/core';
import { PORTFOLIO_DATA } from '../../core/data/portfolio.data';
import { SectionHeaderComponent } from '../../layout/section-header/section-header.component';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [SectionHeaderComponent],
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss',
})
export class EducationComponent {
  readonly data = PORTFOLIO_DATA;
}
