import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingService } from '../core/services/loading.service';

@Component({
  selector: 'app-global-loading',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  template: `
    <div *ngIf="visible()" style="position: fixed; inset: 0; z-index: 2000; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.6)">
      <mat-progress-spinner mode="indeterminate" [diameter]="64" [strokeWidth]="5"></mat-progress-spinner>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlobalLoadingComponent {
  private readonly loading = inject(LoadingService);
  readonly visible = computed(() => this.loading.isLoading());
}


