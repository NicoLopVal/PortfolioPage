import { Component } from '@angular/core';
import { SidebarNavComponent } from './layout/sidebar-nav/sidebar-nav.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeroComponent } from './sections/hero/hero.component';
import { AboutComponent } from './sections/about/about.component';
import { EducationComponent } from './sections/education/education.component';
import { ExperienceComponent } from './sections/experience/experience.component';
import { SkillsComponent } from './sections/skills/skills.component';
import { ServicesComponent } from './sections/services/services.component';
import { PortfolioGalleryComponent } from './sections/portfolio-gallery/portfolio-gallery.component';
import { ReferenceComponent } from './sections/reference/reference.component';
import { ContactComponent } from './sections/contact/contact.component';
import { WhatsappButtonComponent } from './shared/whatsapp-button/whatsapp-button.component';
import { CursorEffectComponent } from './shared/cursor-effect/cursor-effect.component';

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
    ReferenceComponent,
    ContactComponent,
    WhatsappButtonComponent,
    CursorEffectComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
