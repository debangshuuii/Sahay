'use client';
import type { Deadline } from '@/lib/ai/types';

const REMINDER_KEY = 'sahay_reminder_prefs_v1';

export interface ReminderPrefs {
  enabled: boolean;
  daysBefore: number[]; // e.g. [3,1,0]
}

export function getReminderPrefs(): ReminderPrefs {
  if (typeof window === 'undefined') return { enabled: false, daysBefore: [3, 1, 0] };
  try {
    const raw = localStorage.getItem(REMINDER_KEY);
    if (raw) return { enabled: false, daysBefore: [3, 1, 0], ...JSON.parse(raw) };
  } catch { /* ignore */ }
  return { enabled: false, daysBefore: [3, 1, 0] };
}

export function saveReminderPrefs(p: Partial<ReminderPrefs>) {
  if (typeof window === 'undefined') return;
  try {
    const cur = getReminderPrefs();
    localStorage.setItem(REMINDER_KEY, JSON.stringify({ ...cur, ...p }));
  } catch { /* ignore */ }
}

export async function requestNotificationPermission(): Promise<NotificationPermission | 'unsupported'> {
  if (typeof window === 'undefined' || !('Notification' in window)) return 'unsupported';
  if (Notification.permission === 'granted') return 'granted';
  try {
    return await Notification.requestPermission();
  } catch {
    return Notification.permission as NotificationPermission;
  }
}

export function notifyDeadline(title: string, body: string) {
  try {
    if (typeof window === 'undefined' || !('Notification' in window)) return false;
    if (Notification.permission !== 'granted') return false;
    new Notification(title, { body, icon: '/icon.svg' });
    return true;
  } catch {
    return false;
  }
}

/** Fire immediate browser notifications for deadlines within N days. Call on workspace open. */
export function checkAndNotifyUpcoming(
  deadlines: Deadline[],
  docLabel: string,
  opts?: { withinDays?: number }
): number {
  const within = opts?.withinDays ?? 4;
  if (typeof window === 'undefined' || !('Notification' in window)) return 0;
  if (Notification.permission !== 'granted') return 0;
  let fired = 0;
  const today = new Date(); today.setHours(0, 0, 0, 0);
  for (const dl of deadlines) {
    if (!dl.date) continue;
    const t = new Date(dl.date); if (isNaN(t.getTime())) continue;
    t.setHours(0, 0, 0, 0);
    const diff = Math.ceil((t.getTime() - today.getTime()) / 86400000);
    if (diff >= 0 && diff <= within) {
      const label = diff === 0 ? 'Due today' : diff === 1 ? 'Due tomorrow' : `Due in ${diff} days`;
      if (notifyDeadline(`${label}: ${dl.description}`, `${docLabel} — ${dl.original_text}`)) fired++;
    }
  }
  return fired;
}
