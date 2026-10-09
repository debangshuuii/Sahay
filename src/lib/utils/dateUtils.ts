import { SupportedLanguage } from '../ai/types';

export function toVernacularDigits(str: string | number, lang: SupportedLanguage): string {
  const text = String(str);
  if (lang === 'bn') {
    const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return text.replace(/[0-9]/g, d => bnDigits[parseInt(d, 10)]);
  }
  if (lang === 'hi') {
    const hiDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
    return text.replace(/[0-9]/g, d => hiDigits[parseInt(d, 10)]);
  }
  return text;
}

export function calculateDaysRemaining(dateStr: string | null): {
  days: number | null;
  status: 'passed' | 'critical' | 'upcoming' | 'normal' | 'unknown';
  formattedNotice: string;
} {
  if (!dateStr) {
    return { days: null, status: 'unknown', formattedNotice: '' };
  }

  try {
    const target = new Date(dateStr);
    if (isNaN(target.getTime())) {
      return { days: null, status: 'unknown', formattedNotice: '' };
    }

    const today = new Date();
    // Normalize time portion
    target.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return {
        days: diffDays,
        status: 'passed',
        formattedNotice: `${Math.abs(diffDays)} days overdue`,
      };
    } else if (diffDays <= 3) {
      return {
        days: diffDays,
        status: 'critical',
        formattedNotice: diffDays === 0 ? 'Due today!' : `${diffDays} days left`,
      };
    } else if (diffDays <= 14) {
      return {
        days: diffDays,
        status: 'upcoming',
        formattedNotice: `${diffDays} days left`,
      };
    } else {
      return {
        days: diffDays,
        status: 'normal',
        formattedNotice: `${diffDays} days remaining`,
      };
    }
  } catch {
    return { days: null, status: 'unknown', formattedNotice: '' };
  }
}
