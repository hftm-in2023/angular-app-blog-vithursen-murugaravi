import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TitleExistsValidator } from './title-exists.validator';

export interface BlogFormData {
  title: string;
  content: string;
}

@Component({
  selector: 'app-add-blog-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  template: `
    <mat-card style="max-width: 600px; margin: 24px auto;">
      <mat-card-header>
        <mat-card-title>Neuen Blog erstellen</mat-card-title>
      </mat-card-header>
      
      <mat-card-content>
        <form [formGroup]="blogForm" (ngSubmit)="onSubmit()">
          <mat-form-field appearance="outline" style="width: 100%; margin-bottom: 16px;">
            <mat-label>Titel</mat-label>
            <input matInput formControlName="title" placeholder="Blog-Titel eingeben">
            <mat-error *ngIf="blogForm.get('title')?.hasError('required')">
              Titel ist erforderlich
            </mat-error>
            <mat-error *ngIf="blogForm.get('title')?.hasError('minlength')">
              Titel muss mindestens 3 Zeichen lang sein
            </mat-error>
            <mat-error *ngIf="blogForm.get('title')?.hasError('maxlength')">
              Titel darf maximal 100 Zeichen lang sein
            </mat-error>
            <mat-error *ngIf="blogForm.get('title')?.hasError('titleExists')">
              Ein Blog mit diesem Titel existiert bereits
            </mat-error>
            <mat-error *ngIf="blogForm.get('title')?.hasError('titleCheckInProgress')">
              Prüfe Titel...
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline" style="width: 100%; margin-bottom: 16px;">
            <mat-label>Inhalt</mat-label>
            <textarea 
              matInput 
              formControlName="content" 
              placeholder="Blog-Inhalt eingeben"
              rows="8"
              style="min-height: 200px;">
            </textarea>
            <mat-error *ngIf="blogForm.get('content')?.hasError('required')">
              Inhalt ist erforderlich
            </mat-error>
            <mat-error *ngIf="blogForm.get('content')?.hasError('minlength')">
              Inhalt muss mindestens 10 Zeichen lang sein
            </mat-error>
            <mat-error *ngIf="blogForm.get('content')?.hasError('maxlength')">
              Inhalt darf maximal 5000 Zeichen lang sein
            </mat-error>
          </mat-form-field>

          <div style="display: flex; gap: 12px; justify-content: flex-end; margin-top: 24px;">
            <button 
              type="button" 
              mat-stroked-button 
              (click)="onReset()"
              [disabled]="isSubmitting">
              Zurücksetzen
            </button>
            
            <button 
              type="submit" 
              mat-raised-button 
              color="primary"
              [disabled]="!blogForm.valid || isSubmitting">
              <mat-spinner *ngIf="isSubmitting" diameter="20" style="margin-right: 8px;"></mat-spinner>
              {{ isSubmitting ? 'Speichern...' : 'Blog speichern' }}
            </button>
          </div>
        </form>
      </mat-card-content>
    </mat-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddBlogFormComponent {
  @Input() isSubmitting = false;
  @Output() formSubmit = new EventEmitter<BlogFormData>();
  @Output() formReset = new EventEmitter<void>();

  blogForm: FormGroup;
  private titleValidator = inject(TitleExistsValidator);

  constructor(private fb: FormBuilder) {
    this.blogForm = this.fb.group({
      title: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ], [this.titleValidator.titleExists()]],
      content: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(5000)
      ]]
    });
  }

  onSubmit() {
    if (this.blogForm.valid) {
      this.formSubmit.emit(this.blogForm.value);
    }
  }

  onReset() {
    this.blogForm.reset();
    this.formReset.emit();
  }
}
