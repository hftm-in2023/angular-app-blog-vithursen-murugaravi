import { Component, DestroyRef, inject, signal } from '@angular/core';
import { FormBuilder, Validators, AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { BlogFormComponent } from './blog-form.component';
import { of } from 'rxjs';
import { debounceTime, switchMap, map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-blog-page',
  templateUrl: './add-blog.page.html',
  standalone: true,
  imports: [BlogFormComponent]
})
export class AddBlogPage {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  // State für Spinner/Fehler
  loading = signal(false);

  // FormGroup mit synchronen und asynchronen Validatoren
  formTyped = this.fb.group({
    title: ['', {
      validators: [Validators.required, Validators.minLength(3)],
      asyncValidators: [this.titleTakenValidator()],
      updateOn: 'blur'
    }],
    content: ['', [Validators.required, Validators.minLength(10)]]
  });

  // Async Validator für Titel
  private titleTakenValidator(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      const value = control.value;
      if (!value) return of(null);
      return of(value).pipe(
        debounceTime(400),
        switchMap((title) =>
          this.http.get<any[]>(`/api/entries`, { params: { title, exact: 'true' } }).pipe(
            map((res) => res && res.length > 0 ? { titleTaken: true } : null),
            catchError(() => of(null))
          )
        )
      );
    };
  }

  // Reset-Handler
  onReset(): void {
    this.formTyped.reset({ title: '', content: '' });
    this.formTyped.markAsPristine();
    this.formTyped.markAsUntouched();
  }

  // Submit-Handler
  async onSubmit(): Promise<void> {
    this.formTyped.markAllAsTouched();
    if (this.formTyped.invalid) return;
    this.loading.set(true);
    const blogData = this.formTyped.value;
    try {
      await this.blogStore.addBlog(blogData);
    } catch (err) {
      // Fehlerbehandlung
    } finally {
      this.loading.set(false);
    }
  }
}