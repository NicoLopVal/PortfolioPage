import { HttpClient } from '@angular/common/http';
import { Component, computed, inject, signal } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { COUNTRIES } from '../../../core/data/countries.data';

/** Formspree endpoint for this site's contact form. */
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xlgkblgb';

/** Sensible bounds for the message body. */
const MESSAGE_MIN = 20;
const MESSAGE_MAX = 1000;

type SendStatus = 'idle' | 'submitting' | 'success' | 'error';

@Component({
  selector: 'app-send-email',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './send-email.component.html',
  styleUrl: './send-email.component.scss',
})
export class SendEmailComponent {
  private readonly fb = inject(FormBuilder);
  private readonly http = inject(HttpClient);

  readonly countries = COUNTRIES;
  readonly messageMin = MESSAGE_MIN;
  readonly messageMax = MESSAGE_MAX;

  readonly status = signal<SendStatus>('idle');
  readonly errorMessage = signal('');

  /** Default the country selector to the United States. */
  private readonly defaultCountryIso =
    COUNTRIES.find((c) => c.iso === 'US')?.iso ?? COUNTRIES[0].iso;

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required, Validators.maxLength(150)]],
    message: [
      '',
      [
        Validators.required,
        Validators.minLength(MESSAGE_MIN),
        Validators.maxLength(MESSAGE_MAX),
      ],
    ],
    // Phone is optional. When present it must look like a phone number.
    countryIso: [this.defaultCountryIso],
    phone: ['', [Validators.pattern(/^[0-9][0-9\s().-]{3,19}$/)]],
  });

  /** Live character count for the message body (drives the counter UI). */
  readonly messageLength = computed(() => this.messageValue().length);
  private readonly messageValue = signal('');

  constructor() {
    this.form.controls.message.valueChanges.subscribe((v) =>
      this.messageValue.set(v ?? ''),
    );
  }

  /** Convenience getters for cleaner template validation checks. */
  get f() {
    return this.form.controls;
  }

  /** Show an error for a control once the user has interacted with it. */
  showError(controlName: keyof typeof this.form.controls): boolean {
    const c = this.form.controls[controlName];
    return c.invalid && (c.touched || c.dirty);
  }

  onSubmit(): void {
    if (this.status() === 'submitting') return;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.status.set('submitting');
    this.errorMessage.set('');

    const v = this.form.getRawValue();
    const country = this.countries.find((c) => c.iso === v.countryIso);
    const phone = v.phone.trim()
      ? `${country?.dialCode ?? ''} ${v.phone.trim()}`.trim()
      : '';

    const payload = {
      email: v.email,
      subject: v.subject,
      // `_subject` controls the subject line of the notification email.
      _subject: v.subject,
      message: v.message,
      phone,
    };

    this.http
      .post(FORMSPREE_ENDPOINT, payload, {
        headers: { Accept: 'application/json' },
      })
      .subscribe({
        next: () => {
          this.status.set('success');
          this.form.reset({
            email: '',
            subject: '',
            message: '',
            countryIso: this.defaultCountryIso,
            phone: '',
          });
          this.messageValue.set('');
        },
        error: (err) => {
          this.status.set('error');
          this.errorMessage.set(this.extractError(err));
        },
      });
  }

  /** Reset back to the form after a successful send so the user can send again. */
  sendAnother(): void {
    this.status.set('idle');
  }

  private extractError(err: unknown): string {
    const errors = (err as { error?: { errors?: { message?: string }[] } })
      ?.error?.errors;
    if (Array.isArray(errors) && errors.length && errors[0].message) {
      return errors[0].message;
    }
    return 'Something went wrong sending your message. Please try again later.';
  }
}
