import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PORTFOLIO_DATA } from '../../core/data/portfolio.data';
import { SectionHeaderComponent } from '../../layout/section-header/section-header.component';
import { SocialLinksComponent } from '../../shared/social-links/social-links.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, SectionHeaderComponent, SocialLinksComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  readonly data = PORTFOLIO_DATA;
  submitted = false;

  private readonly fb = inject(FormBuilder);

  readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    console.log('Contact form submitted:', this.form.value);
    this.submitted = true;
    this.form.reset();
  }
}
