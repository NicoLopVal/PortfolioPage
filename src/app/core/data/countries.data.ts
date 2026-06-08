export interface Country {
  /** ISO 3166-1 alpha-2 code (used as a stable track key). */
  iso: string;
  /** Display name. */
  name: string;
  /** International dialing code, including the leading "+". */
  dialCode: string;
  /** Flag emoji. */
  flag: string;
}

/**
 * A pragmatic, alphabetically-sorted subset of countries for the phone
 * country-code selector. Flags are emoji so no image assets are required.
 */
export const COUNTRIES: Country[] = [
  { iso: 'AR', name: 'Argentina', dialCode: '+54', flag: '🇦🇷' },
  { iso: 'AU', name: 'Australia', dialCode: '+61', flag: '🇦🇺' },
  { iso: 'AT', name: 'Austria', dialCode: '+43', flag: '🇦🇹' },
  { iso: 'BE', name: 'Belgium', dialCode: '+32', flag: '🇧🇪' },
  { iso: 'BR', name: 'Brazil', dialCode: '+55', flag: '🇧🇷' },
  { iso: 'CA', name: 'Canada', dialCode: '+1', flag: '🇨🇦' },
  { iso: 'CL', name: 'Chile', dialCode: '+56', flag: '🇨🇱' },
  { iso: 'CN', name: 'China', dialCode: '+86', flag: '🇨🇳' },
  { iso: 'CO', name: 'Colombia', dialCode: '+57', flag: '🇨🇴' },
  { iso: 'CR', name: 'Costa Rica', dialCode: '+506', flag: '🇨🇷' },
  { iso: 'CZ', name: 'Czechia', dialCode: '+420', flag: '🇨🇿' },
  { iso: 'DK', name: 'Denmark', dialCode: '+45', flag: '🇩🇰' },
  { iso: 'EG', name: 'Egypt', dialCode: '+20', flag: '🇪🇬' },
  { iso: 'FI', name: 'Finland', dialCode: '+358', flag: '🇫🇮' },
  { iso: 'FR', name: 'France', dialCode: '+33', flag: '🇫🇷' },
  { iso: 'DE', name: 'Germany', dialCode: '+49', flag: '🇩🇪' },
  { iso: 'GR', name: 'Greece', dialCode: '+30', flag: '🇬🇷' },
  { iso: 'HK', name: 'Hong Kong', dialCode: '+852', flag: '🇭🇰' },
  { iso: 'HU', name: 'Hungary', dialCode: '+36', flag: '🇭🇺' },
  { iso: 'IN', name: 'India', dialCode: '+91', flag: '🇮🇳' },
  { iso: 'ID', name: 'Indonesia', dialCode: '+62', flag: '🇮🇩' },
  { iso: 'IE', name: 'Ireland', dialCode: '+353', flag: '🇮🇪' },
  { iso: 'IL', name: 'Israel', dialCode: '+972', flag: '🇮🇱' },
  { iso: 'IT', name: 'Italy', dialCode: '+39', flag: '🇮🇹' },
  { iso: 'JP', name: 'Japan', dialCode: '+81', flag: '🇯🇵' },
  { iso: 'MY', name: 'Malaysia', dialCode: '+60', flag: '🇲🇾' },
  { iso: 'MX', name: 'Mexico', dialCode: '+52', flag: '🇲🇽' },
  { iso: 'NL', name: 'Netherlands', dialCode: '+31', flag: '🇳🇱' },
  { iso: 'NZ', name: 'New Zealand', dialCode: '+64', flag: '🇳🇿' },
  { iso: 'NO', name: 'Norway', dialCode: '+47', flag: '🇳🇴' },
  { iso: 'PE', name: 'Peru', dialCode: '+51', flag: '🇵🇪' },
  { iso: 'PH', name: 'Philippines', dialCode: '+63', flag: '🇵🇭' },
  { iso: 'PL', name: 'Poland', dialCode: '+48', flag: '🇵🇱' },
  { iso: 'PT', name: 'Portugal', dialCode: '+351', flag: '🇵🇹' },
  { iso: 'RO', name: 'Romania', dialCode: '+40', flag: '🇷🇴' },
  { iso: 'SG', name: 'Singapore', dialCode: '+65', flag: '🇸🇬' },
  { iso: 'ZA', name: 'South Africa', dialCode: '+27', flag: '🇿🇦' },
  { iso: 'KR', name: 'South Korea', dialCode: '+82', flag: '🇰🇷' },
  { iso: 'ES', name: 'Spain', dialCode: '+34', flag: '🇪🇸' },
  { iso: 'SE', name: 'Sweden', dialCode: '+46', flag: '🇸🇪' },
  { iso: 'CH', name: 'Switzerland', dialCode: '+41', flag: '🇨🇭' },
  { iso: 'TW', name: 'Taiwan', dialCode: '+886', flag: '🇹🇼' },
  { iso: 'TH', name: 'Thailand', dialCode: '+66', flag: '🇹🇭' },
  { iso: 'TR', name: 'Türkiye', dialCode: '+90', flag: '🇹🇷' },
  { iso: 'AE', name: 'United Arab Emirates', dialCode: '+971', flag: '🇦🇪' },
  { iso: 'GB', name: 'United Kingdom', dialCode: '+44', flag: '🇬🇧' },
  { iso: 'US', name: 'United States', dialCode: '+1', flag: '🇺🇸' },
  { iso: 'UY', name: 'Uruguay', dialCode: '+598', flag: '🇺🇾' },
  { iso: 'VN', name: 'Vietnam', dialCode: '+84', flag: '🇻🇳' },
];
