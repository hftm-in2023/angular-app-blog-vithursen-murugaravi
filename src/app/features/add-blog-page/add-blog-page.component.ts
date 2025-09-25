import { Component, DestroyRef, inject, signal } from '@angular/core';
import { FormBuilder, Validators, AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { BlogFormComponent } from './blog-form.component';
import { Observable, of } from 'rxjs';
import { debounceTime, switchMap, map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BlogService } from '../../blog/blog.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-blog-page',
  standalone: true,
  imports: [BlogFormComponent],
  templateUrl: './add-blog.page.html'
})
export class AddBlogPageComponent {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private blogService = inject(BlogService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  // State für Spinner/Fehler
  loading = signal(false);
  error = signal<string | null>(null);

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
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const value = control.value;
      if (!value || value.length < 3) return of(null);
      
      return of(value).pipe(
        debounceTime(400),
        switchMap((title) =>
          this.blogService.getBlogs().pipe(
            map((blogs) => {
              const titleExists = blogs.some(blog => 
                blog.title.toLowerCase() === title.toLowerCase()
              );
              return titleExists ? { titleTaken: true } : null;
            }),
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
  onSubmit(): void {
    this.formTyped.markAllAsTouched();
    if (this.formTyped.invalid) return;
    this.loading.set(true);
    const blogData = this.formTyped.getRawValue();

    if (blogData.title && blogData.content) {
      this.blogService.addBlog({ title: blogData.title, content: blogData.content }).subscribe({
        next: () => {
          this.loading.set(false);
          this.router.navigate(['/']);
        },
        error: (err: any) => {
          this.loading.set(false);
          this.error.set('Failed to add blog entry.');
          console.error(err);
        }
      });
    }
  }
}