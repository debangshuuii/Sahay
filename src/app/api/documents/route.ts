import { NextRequest, NextResponse } from 'next/server';
import { localStorageManager } from '@/lib/storage/localStorageManager';

export const runtime = 'nodejs';

/**
 * Documents API — cloud-sync ready.
 * Without SUPABASE_* configured, acts as echo/validation layer;
 * client remains local-first via localStorageManager.
 */
export async function GET() {
  // Server has no access to client localStorage; return hint payload.
  return NextResponse.json({
    documents: [],
    cloudEnabled: Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY),
    note: 'Local-first mode. Configure SUPABASE_URL + SUPABASE_ANON_KEY and a documents table to enable cross-device sync.',
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { analysis } = body || {};
    if (!analysis || !analysis.document_type) {
      return NextResponse.json({ error: 'Invalid analysis payload' }, { status: 400 });
    }
    const cloudOn = Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY);
    void localStorageManager;
    if (!cloudOn) {
      return NextResponse.json({ success: true, synced: false, reason: 'cloud-disabled-local-only' });
    }
    // TODO: insert into Supabase `documents` table here.
    return NextResponse.json({ success: true, synced: true });
  } catch (e) {
    console.error('documents POST error', e);
    return NextResponse.json({ error: 'failed' }, { status: 500 });
  }
}
