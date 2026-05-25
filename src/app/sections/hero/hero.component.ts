import { Component } from '@angular/core';
import { PORTFOLIO_DATA } from '../../core/data/portfolio.data';
import {
  LiquidGlassButtonComponent,
  LiquidGlassPanelComponent,
} from '../../shared/liquid-glass';
import { SocialLinksComponent } from '../../shared/social-links/social-links.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [LiquidGlassPanelComponent, LiquidGlassButtonComponent, SocialLinksComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  readonly data = PORTFOLIO_DATA;
}
