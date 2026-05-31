import { Component, HostListener, OnDestroy, computed, signal } from '@angular/core';
import { SectionHeaderComponent } from '../../layout/section-header/section-header.component';
import { LiquidGlassPanelComponent, LiquidGlassInputComponent } from '../../shared/liquid-glass';
import {
  SkillsGroup,
  ImplGroup,
  buildSkillsGroups,
  buildImplGroups,
} from '../../core/data/skills.data';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [SectionHeaderComponent, LiquidGlassPanelComponent, LiquidGlassInputComponent],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent implements OnDestroy {
  // ── View mode ────────────────────────────────────────────────────────────────
  readonly viewMode = signal<'skills' | 'implemented'>('skills');

  // ── Search ───────────────────────────────────────────────────────────────────
  readonly searchQuery = signal('');

  // ── Modal state ──────────────────────────────────────────────────────────────
  readonly skillsModal = signal<SkillsGroup | null>(null);
  readonly implModal = signal<ImplGroup | null>(null);

  // ── Pre-built groups ─────────────────────────────────────────────────────────
  private readonly _skillsGroups = buildSkillsGroups();
  private readonly _implGroups = buildImplGroups();

  // ── Filtered groups ──────────────────────────────────────────────────────────
  readonly filteredSkillsGroups = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    if (!q) return this._skillsGroups;
    return this._skillsGroups.filter(g =>
      g.hability.toLowerCase().includes(q) ||
      g.techniques.some(t =>
        t.technique.toLowerCase().includes(q) ||
        t.implementedPlaces.some(p => p.toLowerCase().includes(q))
      )
    );
  });

  readonly filteredImplGroups = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    if (!q) return this._implGroups;
    return this._implGroups.filter(g =>
      g.place.toLowerCase().includes(q) ||
      g.habilities.some(h =>
        h.hability.toLowerCase().includes(q) ||
        h.techniques.some(t => t.technique.toLowerCase().includes(q))
      )
    );
  });

  // ── Actions ──────────────────────────────────────────────────────────────────
  setViewMode(mode: 'skills' | 'implemented'): void {
    this.viewMode.set(mode);
    this.searchQuery.set('');
    this.closeModal();
  }

  openSkillsModal(group: SkillsGroup): void {
    this.skillsModal.set(group);
    this.implModal.set(null);
    document.body.style.overflow = 'hidden';
  }

  openImplModal(group: ImplGroup): void {
    this.implModal.set(group);
    this.skillsModal.set(null);
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.skillsModal.set(null);
    this.implModal.set(null);
    document.body.style.overflow = '';
  }

  onOverlayClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) this.closeModal();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.skillsModal() || this.implModal()) this.closeModal();
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
  }

  levelClass(level: string): string {
    return level.toLowerCase();
  }
}
