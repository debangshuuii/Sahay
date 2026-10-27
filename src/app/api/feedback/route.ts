import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getClientIp } from '@/lib/security/rateLimit';

export const runtime = 'nodejs';

/**
 * Chat feedback receiver. Local-first: persists client-side,
 * server logs for future training-quality loop (Supabase-ready).
 */
export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const rl = checkRateLimit(`feedback:${ip}`, { limit: 60, windowMs: 60_000 });
    if (!rl.allowed) return NextResponse.json({ error: 'Rate limited' }, { status: 429 });

    const body = await req.json();
    const { rating, question, answer, docId } = body || {};
    if (rating !== 'up' && rating !== 'down') {
      return NextResponse.json({ error: 'rating must be up|down' }, { status: 400 });
    }
    console.log('[feedback]', { rating, docId, q: String(question || '').slice(0, 120) });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('feedback error', e);
    return NextResponse.json({ error: 'failed' }, { status: 500 });
  }
}
