export function maskSensitiveValue(value: string): string {
  if (!value) return value;
  
  // Clean string for checking
  const trimmed = value.trim();

  // Aadhaar: 12 digits (with or without spaces/hyphens)
  const aadhaarMatch = trimmed.match(/^(\d{4})[\s-]?(\d{4})[\s-]?(\d{4})$/);
  if (aadhaarMatch) {
    return `XXXX-XXXX-${aadhaarMatch[3]}`;
  }

  // PAN: 5 letters, 4 digits, 1 letter (e.g. ABCDE1234F)
  const panMatch = trimmed.match(/^([A-Z]{5})(\d{4})([A-Z]{1})$/i);
  if (panMatch) {
    return `${panMatch[1].slice(0, 2)}XXX-XX${panMatch[3]}`;
  }

  // Phone number (10 digits, optionally starting with +91)
  const phoneMatch = trimmed.match(/^(\+?91[\s-]?)?([6-9]\d{4})(\d{5})$/);
  if (phoneMatch) {
    return `+91 XXXXX-${phoneMatch[3]}`;
  }

  // Consumer ID or Account Number: 4 to 16 digits
  const numMatch = trimmed.match(/^(\d{4,})$/);
  if (numMatch) {
    const s = numMatch[1];
    if (s.length <= 6) {
      return `XX${s.slice(-3)}`;
    }
    return `${'X'.repeat(s.length - 4)}${s.slice(-4)}`;
  }

  // Fallback for general sensitive strings: mask middle
  if (trimmed.length > 5) {
    return `${trimmed.slice(0, 2)}${'*'.repeat(trimmed.length - 4)}${trimmed.slice(-2)}`;
  }

  return trimmed;
}
