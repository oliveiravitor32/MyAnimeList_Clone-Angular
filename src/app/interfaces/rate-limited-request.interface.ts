import { Observable } from 'rxjs';

export interface RateLimitedRequest<T> {
  execute: () => Observable<T>;
  observer: {
    next: (value: T) => void;
    error: (err: any) => void;
    complete: () => void;
  };
}
