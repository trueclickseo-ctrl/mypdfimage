interface RateLimitState {
  tokens: number;
  lastRefill: number;
}

const rateLimitCache = new Map<string, RateLimitState>();

/**
 * Validates developer API Keys and enforces token-bucket rate limits.
 */
export class ApiKeyManager {
  private static MOCK_KEYS = new Set([
    "pdfv_live_test_key_12345",
    "pdfv_live_stripe_premium_98765"
  ]);

  /**
   * Validates if a key is active
   */
  public static isValid(key: string): boolean {
    return this.MOCK_KEYS.has(key) || key.startsWith("pdfv_live_");
  }

  /**
   * Enforces rate limiting on a specific key.
   * Limit: 60 requests per minute (1 token refilled every second, max 60 tokens).
   */
  public static checkRateLimit(key: string): { allowed: boolean; remaining: number; limit: number } {
    const limit = 60;
    const now = Date.now();
    let state = rateLimitCache.get(key);

    if (!state) {
      state = { tokens: limit, lastRefill: now };
      rateLimitCache.set(key, state);
    }

    // Refill tokens based on elapsed time (1 token per 1000ms)
    const elapsed = now - state.lastRefill;
    const refilled = Math.floor(elapsed / 1000);
    
    if (refilled > 0) {
      state.tokens = Math.min(limit, state.tokens + refilled);
      state.lastRefill = now;
    }

    if (state.tokens > 0) {
      state.tokens--;
      rateLimitCache.set(key, state);
      return { allowed: true, remaining: state.tokens, limit };
    }

    return { allowed: false, remaining: 0, limit };
  }
}
