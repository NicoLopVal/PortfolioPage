import { Component } from '@angular/core';
import { PORTFOLIO_DATA } from '../../core/data/portfolio.data';
import { SectionHeaderComponent } from '../../layout/section-header/section-header.component';
import { RevealDirective } from '../../shared/reveal/reveal.directive';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [SectionHeaderComponent, RevealDirective],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent {
  readonly data = PORTFOLIO_DATA;
}
