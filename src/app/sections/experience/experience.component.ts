import { Component, HostListener, signal } from '@angular/core';
import { PORTFOLIO_DATA } from '../../core/data/portfolio.data';
import { ExperienceItem } from '../../core/models/portfolio.models';
import { SectionHeaderComponent } from '../../layout/section-header/section-header.component';
import { LiquidGlassPanelComponent } from '../../shared/liquid-glass';

export type DescriptionBlock =
  | { type: 'heading'; text: string }
  | { type: 'bullet'; text: string };

export interface ExperienceGroup {
  company: string;
  companyLogo: string;
  companyLinkedin: string;
  accentBar: boolean;
  items: ExperienceItem[];
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [SectionHeaderComponent, LiquidGlassPanelComponent],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
})
export class ExperienceComponent {
  readonly data = PORTFOLIO_DATA;
  readonly selectedItem = signal<ExperienceItem | null>(null);

  readonly groupedExperience: ExperienceGroup[] = PORTFOLIO_DATA.experience.reduce(
    (groups: ExperienceGroup[], item) => {
      const last = groups[groups.length - 1];
      if (last && last.company === item.company) {
        last.items.push(item);
      } else {
        groups.push({
          company: item.company,
          companyLogo: item.companyLogo,
          companyLinkedin: item.companyLinkedin,
          accentBar: item.accentBar,
          items: [item],
        });
      }
      return groups;
    },
    [],
  );

  openModal(item: ExperienceItem): void {
    this.selectedItem.set(item);
  }

  closeModal(): void {
    this.selectedItem.set(null);
  }

  onOverlayClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.selectedItem()) {
      this.closeModal();
    }
  }

  parseDescription(description: string): DescriptionBlock[] {
    const blocks: DescriptionBlock[] = [];

    for (const line of description.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed) {
        continue;
      }

      if (trimmed.startsWith('- ')) {
        blocks.push({ type: 'bullet', text: trimmed.slice(2).trim() });
      } else {
        blocks.push({ type: 'heading', text: trimmed });
      }
    }

    return blocks;
  }

  linkedInLabel(company: string): string {
    return `${company} on LinkedIn`;
  }
}
