import { Component } from '@angular/core';
import { PORTFOLIO_DATA } from '../../core/data/portfolio.data';
import { SectionHeaderComponent } from '../../layout/section-header/section-header.component';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [SectionHeaderComponent],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent {
  readonly data = PORTFOLIO_DATA;
}
