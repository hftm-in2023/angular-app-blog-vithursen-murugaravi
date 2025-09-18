import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of, timer } from 'rxjs';
import { map, switchMap, catchError, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { BlogService } from '../../blog/blog.service';

@Injectable({
  providedIn: 'root'
})
export class TitleExistsValidator {
  constructor(private blogService: BlogService) {}

  titleExists(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value || control.value.length < 3) {
        return of(null);
      }

      return timer(500).pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(() => this.blogService.getBlogs()),
        map(blogs => {
          const titleExists = blogs.some(blog => 
            blog.title.toLowerCase() === control.value.toLowerCase()
          );
          return titleExists ? { titleExists: true } : null;
        }),
        catchError(() => of(null))
      );
    };
  }
}
