import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject, throwError, timer } from 'rxjs';
import { catchError, concatMap, finalize, mergeMap, tap } from 'rxjs/operators';
import { RateLimitedRequest } from '../interfaces/rate-limited-request.interface';
import { TokenBucket } from '../utils/token-bucket.class';

@Injectable({
  providedIn: 'root',
})
export class ApiRateLimiterService {
  // Rate limit configuration
  private readonly perOneAndHalfASecondLimit = 2;
  private readonly perMinuteLimit = 60;

  // Token buckets for rate limiting
  private readonly secondLimitBucket = new TokenBucket(
    this.perOneAndHalfASecondLimit,
    1500
  );
  private readonly minuteLimitBucket = new TokenBucket(
    this.perMinuteLimit,
    60000
  );

  // Request queue
  private requestQueue$ = new Subject<RateLimitedRequest<any>>();

  constructor(private http: HttpClient) {
    // Process queue using concatMap for sequential execution when needed
    this.requestQueue$
      .pipe(concatMap((request) => this.processRequest(request)))
      .subscribe();
  }

  /**
   * Execute a rate-limited HTTP request
   * @param url The URL to request
   * @param options HTTP options (body, headers, params)
   * @returns Observable of the HTTP response
   */
  executeRequest<T>(
    url: string,
    options: {
      body?: any;
      headers?: HttpHeaders | { [header: string]: string | string[] };
      params?:
        | HttpParams
        | {
            [param: string]:
              | string
              | number
              | boolean
              | ReadonlyArray<string | number | boolean>;
          };
      reportProgress?: boolean;
      responseType?: 'json';
      withCredentials?: boolean;
    } = {}
  ): Observable<T> {
    return new Observable<T>((subscriber) => {
      const request: RateLimitedRequest<T> = {
        execute: () => this.performHttpRequest<T>(url, options),
        observer: subscriber,
      };

      this.requestQueue$.next(request);
    });
  }

  /**
   * Process a single request with rate limiting applied
   */
  private processRequest<T>(request: RateLimitedRequest<T>): Observable<T> {
    return this.waitForRateLimit().pipe(
      mergeMap(() => request.execute()),
      tap({
        next: (result) => {
          request.observer.next(result);
          request.observer.complete();
        },
        error: (error) => {
          request.observer.error(error);
        },
      }),
      catchError((error) => {
        console.error('Rate limited request failed:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Perform the actual HTTP request
   */
  private performHttpRequest<T>(url: string, options: any): any {
    return this.http.get<T>(url, options).pipe(
      tap(() => {
        // Record this request in both buckets
        this.secondLimitBucket.consumeToken();
        this.minuteLimitBucket.consumeToken();
      }),
      finalize(() => {
        console.debug('Request completed, tokens remaining:', {
          perSecond: this.secondLimitBucket.getTokensRemaining(),
          perMinute: this.minuteLimitBucket.getTokensRemaining(),
        });
      })
    );
  }

  /**
   * Returns an Observable that resolves when rate limiting allows a new request
   */
  private waitForRateLimit(): Observable<void> {
    const now = Date.now();

    // Clean up expired timestamps in both buckets
    this.secondLimitBucket.refillExpiredTokens(now);
    this.minuteLimitBucket.refillExpiredTokens(now);

    // Check if we can proceed immediately
    if (
      this.secondLimitBucket.getTokensRemaining() > 0 &&
      this.minuteLimitBucket.getTokensRemaining() > 0
    ) {
      return of(undefined);
    }

    // Calculate how long we need to wait
    let waitTimeMs = 0;

    if (this.secondLimitBucket.getTokensRemaining() <= 0) {
      waitTimeMs = Math.max(
        waitTimeMs,
        this.secondLimitBucket.getRefillTime(now)
      );
    }

    if (this.minuteLimitBucket.getTokensRemaining() <= 0) {
      waitTimeMs = Math.max(
        waitTimeMs,
        this.minuteLimitBucket.getRefillTime(now)
      );
    }

    // Add a small buffer to be safe
    waitTimeMs += 10;

    console.log(
      `Rate limit reached, waiting ${waitTimeMs}ms before next request`
    );

    // Return a timer that resolves after the wait time
    return timer(waitTimeMs).pipe(
      mergeMap(() => this.waitForRateLimit()) // Recursively check again after waiting
    );
  }
}
