/**
 * Token bucket implementation for tracking rate limits
 */
export class TokenBucket {
  private tokenTimestamps: number[] = [];

  constructor(
    private readonly capacity: number,
    private readonly windowMs: number
  ) {}

  /**
   * Records a token consumption (request)
   */
  consumeToken(): void {
    this.tokenTimestamps.push(Date.now());
  }

  /**
   * Gets the number of tokens currently available
   */
  getTokensRemaining(): number {
    return this.capacity - this.tokenTimestamps.length;
  }

  /**
   * Removes expired timestamps and refills tokens
   */
  refillExpiredTokens(now: number): void {
    const cutoffTime = now - this.windowMs;
    this.tokenTimestamps = this.tokenTimestamps.filter(
      (timestamp) => timestamp > cutoffTime
    );
  }

  /**
   * Gets the time until the next token becomes available
   */
  getRefillTime(now: number): number {
    if (this.tokenTimestamps.length === 0) return 0;
    const oldestTimestamp = Math.min(...this.tokenTimestamps);
    return Math.max(0, oldestTimestamp + this.windowMs - now);
  }
}
