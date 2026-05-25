import { Component } from '@angular/core';
import { PORTFOLIO_DATA } from '../../core/data/portfolio.data';
import { SocialLinksComponent } from '../../shared/social-links/social-links.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [SocialLinksComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  readonly data = PORTFOLIO_DATA;
}
