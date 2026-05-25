import { Component } from '@angular/core';
import { PORTFOLIO_DATA } from '../../core/data/portfolio.data';
import { SectionHeaderComponent } from '../../layout/section-header/section-header.component';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [SectionHeaderComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent {
  readonly data = PORTFOLIO_DATA;
}
