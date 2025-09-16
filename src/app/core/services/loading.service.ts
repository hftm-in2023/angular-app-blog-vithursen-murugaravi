import { Injectable, computed, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private readonly pendingRequestsCount = signal(0);

  readonly isLoading = computed(() => this.pendingRequestsCount() > 0);

  increment(): void {
    this.pendingRequestsCount.update(value => value + 1);
  }

  decrement(): void {
    this.pendingRequestsCount.update(value => Math.max(0, value - 1));
  }
}


