import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  template: `
    <div
      [ngStyle]="fullscreen() ? {
        position: 'fixed', inset: 0, background: 'rgba(255,255,255,0.7)',
        display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
      } : {
        display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '24px'
      }"
    >
      <mat-progress-spinner [diameter]="diameter()" [strokeWidth]="strokeWidth()" mode="indeterminate"></mat-progress-spinner>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpinnerComponent {
  diameter = input<number>(48);
  strokeWidth = input<number>(4);
  fullscreen = input<boolean>(false);
}


