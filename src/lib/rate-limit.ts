const WINDOW_MS = 15 * 60 * 1_000;
const MAX_REQUESTS_PER_WINDOW = 5;
const MAX_TRACKED_CLIENTS = 5_000;

type Entry = { count: number; resetAt: number };
type RateLimitGlobal = typeof globalThis & { __noralixSubmissionRateLimit?: Map<string, Entry> };
const rateLimitGlobal = globalThis as RateLimitGlobal;
const entries = rateLimitGlobal.__noralixSubmissionRateLimit ?? new Map<string, Entry>();
rateLimitGlobal.__noralixSubmissionRateLimit = entries;

function clientKey(req: Request) {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  return ip.slice(0, 200);
}

function prune(now: number) {
  if (entries.size < MAX_TRACKED_CLIENTS) return;
  for (const [key, entry] of entries) {
    if (entry.resetAt <= now) entries.delete(key);
  }
  if (entries.size >= MAX_TRACKED_CLIENTS) entries.clear();
}

export function takeSubmissionSlot(req: Request, route: "contact" | "rfq") {
  const now = Date.now();
  prune(now);
  const key = `${route}:${clientKey(req)}`;
  const current = entries.get(key);
  if (!current || current.resetAt <= now) {
    entries.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfterSeconds: 0 };
  }
  current.count += 1;
  const retryAfterSeconds = Math.max(1, Math.ceil((current.resetAt - now) / 1_000));
  return { allowed: current.count <= MAX_REQUESTS_PER_WINDOW, retryAfterSeconds };
}
