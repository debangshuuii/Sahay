import { NextRequest, NextResponse } from 'next/server';
import { VERIFIED_OFFICIAL_PROCEDURES } from '@/lib/ai/sources';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q')?.toLowerCase() || '';
  const category = searchParams.get('category')?.toLowerCase();

  let results = VERIFIED_OFFICIAL_PROCEDURES;

  if (category) {
    results = results.filter(p => p.category === category);
  }

  if (q) {
    results = results.filter(p => 
      p.titleEn.toLowerCase().includes(q) ||
      p.titleBn.toLowerCase().includes(q) ||
      p.titleHi.toLowerCase().includes(q) ||
      p.departmentEn.toLowerCase().includes(q) ||
      p.summaryEn.toLowerCase().includes(q) ||
      p.summaryBn.toLowerCase().includes(q) ||
      p.summaryHi.toLowerCase().includes(q)
    );
  }

  return NextResponse.json({
    count: results.length,
    procedures: results,
  });
}
