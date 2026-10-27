/**
 * Simple in-memory token-bucket rate limiter for API routes.
 * Per-IP + per-route. No external store — suitable for single-instance
 * Next.js; replace with Redis/Upstash for multi-instance production.
 */

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAfterMs: number;
}

export function checkRateLimit(
  key: string,
  opts: { limit?: number; windowMs?: number } = {}
): RateLimitResult {
  const limit = opts.limit ?? 20;
  const windowMs = opts.windowMs ?? 60_000;
  const now = Date.now();
  const b = buckets.get(key);

  if (!b || now > b.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, resetAfterMs: windowMs };
  }
  if (b.count >= limit) {
    return { allowed: false, remaining: 0, resetAfterMs: b.resetAt - now };
  }
  b.count += 1;
  return { allowed: true, remaining: limit - b.count, resetAfterMs: b.resetAt - now };
}

export function getClientIp(req: Request): string {
  const h = (name: string) => req.headers.get(name) || '';
  return (
    h('x-forwarded-for').split(',')[0].trim() ||
    h('x-real-ip') ||
    'unknown'
  );
}

// Periodic cleanup to avoid unbounded growth
if (typeof setInterval !== 'undefined') {
  const g = globalThis as unknown as { __sahayRlInit?: boolean };
  if (!g.__sahayRlInit) {
    g.__sahayRlInit = true;
    setInterval(() => {
      const now = Date.now();
      for (const [k, v] of buckets) if (now > v.resetAt) buckets.delete(k);
    }, 5 * 60_000).unref?.();
  }
}
