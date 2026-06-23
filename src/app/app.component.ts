import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SidebarNavComponent } from './layout/sidebar-nav/sidebar-nav.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeroComponent } from './sections/hero/hero.component';
import { AboutComponent } from './sections/about/about.component';
import { EducationComponent } from './sections/education/education.component';
import { ExperienceComponent } from './sections/experience/experience.component';
import { SkillsComponent } from './sections/skills/skills.component';
import { ServicesComponent } from './sections/services/services.component';
import { PortfolioGalleryComponent } from './sections/portfolio-gallery/portfolio-gallery.component';
import { PortfolioDetailComponent } from './sections/portfolio-detail/portfolio-detail.component';
import { ReferenceComponent } from './sections/reference/reference.component';
import { ContactComponent } from './sections/contact/contact.component';
import { WhatsappButtonComponent } from './shared/whatsapp-button/whatsapp-button.component';
import { CursorEffectComponent } from './shared/cursor-effect/cursor-effect.component';
import { ParticleNetworkComponent } from './shared/particle-network/particle-network.component';
import { PortfolioNavigationService } from './core/services/portfolio-navigation.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    SidebarNavComponent,
    FooterComponent,
    HeroComponent,
    AboutComponent,
    EducationComponent,
    ExperienceComponent,
    SkillsComponent,
    ServicesComponent,
    PortfolioGalleryComponent,
    PortfolioDetailComponent,
    ReferenceComponent,
    ContactComponent,
    WhatsappButtonComponent,
    CursorEffectComponent,
    ParticleNetworkComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  readonly navService = inject(PortfolioNavigationService);
  private readonly platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const params = new URLSearchParams(window.location.search);
      const projectId = params.get('project');
      if (projectId) this.navService.openById(projectId);
    }
  }
}
