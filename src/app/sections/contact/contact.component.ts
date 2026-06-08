import { Component } from '@angular/core';
import { PORTFOLIO_DATA } from '../../core/data/portfolio.data';
import { SectionHeaderComponent } from '../../layout/section-header/section-header.component';
import { SocialLinksComponent } from '../../shared/social-links/social-links.component';
import { SendEmailComponent } from './send-email/send-email.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [SectionHeaderComponent, SocialLinksComponent, SendEmailComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  readonly data = PORTFOLIO_DATA;
}
