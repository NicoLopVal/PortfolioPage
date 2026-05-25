import { Component, Input } from '@angular/core';
import { SocialLink } from '../../core/models/portfolio.models';

@Component({
  selector: 'app-social-links',
  standalone: true,
  templateUrl: './social-links.component.html',
  styleUrl: './social-links.component.scss',
})
export class SocialLinksComponent {
  @Input({ required: true }) links!: SocialLink[];
}
