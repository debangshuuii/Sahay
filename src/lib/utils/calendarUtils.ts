import { Deadline } from '../ai/types';

/**
 * Generates and downloads an iCalendar (.ics) file so citizens
 * can add critical notice deadlines to Google Calendar, Apple Calendar, or Outlook.
 */
export function downloadDeadlineICS(deadline: Deadline, documentTitle: string, issuingAuthority: string = 'Government Department') {
  if (!deadline.date) {
    alert('This deadline does not have an explicit calendar date.');
    return;
  }

  // Parse YYYY-MM-DD
  const cleanDateStr = deadline.date.replace(/[^0-9-]/g, '');
  const parts = cleanDateStr.split('-');
  if (parts.length < 3) {
    alert('Invalid date format for calendar export.');
    return;
  }

  const year = parts[0];
  const month = parts[1].padStart(2, '0');
  const day = parts[2].padStart(2, '0');

  const dateCompact = `${year}${month}${day}`;
  const nowCompact = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const uid = `sahay_deadline_${Date.now()}@sahay.ai`;

  const summary = `⚠️ Deadline: ${deadline.description} (${documentTitle})`;
  const description = `Sahay Citizen Deadline Reminder\\nDocument: ${documentTitle}\\nIssuing Authority: ${issuingAuthority}\\nDeadline: ${deadline.original_text}\\n\\nPlease verify compliance and complete mandatory steps before this date.`;

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Sahay AI//Citizen Grievance Assistant//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${nowCompact}`,
    `DTSTART;VALUE=DATE:${dateCompact}`,
    `DTEND;VALUE=DATE:${dateCompact}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description}`,
    'STATUS:CONFIRMED',
    'TRANSP:TRANSPARENT',
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    'DESCRIPTION:Reminder: Sahay Notice Deadline Tomorrow',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `Sahay_Deadline_${dateCompact}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
