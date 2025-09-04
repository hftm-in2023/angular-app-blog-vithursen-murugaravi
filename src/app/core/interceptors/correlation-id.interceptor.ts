import { HttpInterceptorFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';

function generateCorrelationId(): string {
  const cryptoObj = (globalThis as any).crypto as Crypto | undefined;
  if (cryptoObj && 'randomUUID' in cryptoObj && typeof (cryptoObj as any).randomUUID === 'function') {
    return (cryptoObj as any).randomUUID();
  }
  // Fallback: einfache UUID v4-ähnliche ID
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const correlationIdInterceptor: HttpInterceptorFn = (req, next): Observable<HttpEvent<unknown>> => {
  const hasHeader = req.headers.has('X-Correlation-Id');
  const correlationId = hasHeader ? req.headers.get('X-Correlation-Id')! : generateCorrelationId();
  const startedAtMs = Date.now();

  const requestWithId = hasHeader ? req : req.clone({ headers: req.headers.set('X-Correlation-Id', correlationId) });

  return next(requestWithId).pipe(
    tap({
      next: () => {
        // no-op; logging im finalize
      },
      error: () => {
        // no-op; logging im finalize
      }
    }),
    finalize(() => {
      const durationMs = Date.now() - startedAtMs;
      // Lightweight Logging
      // eslint-disable-next-line no-console
      console.debug('[HTTP]', requestWithId.method, requestWithId.urlWithParams, {
        correlationId,
        durationMs
      });
    })
  );
};


