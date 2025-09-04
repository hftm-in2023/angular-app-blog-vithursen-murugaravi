import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Blog, BlogEntriesResponseSchema } from './blog.schemas';

@Injectable({ providedIn: 'root' })
export class BlogService {
  private apiUrl = 'https://d-cap-blog-backend---v2.whitepond-b96fee4b.westeurope.azurecontainerapps.io/entries?updatedAfter=2022-03-10T12%3A15%3A50';

  constructor(private http: HttpClient) {}

  getBlogs(): Observable<Blog[]> {
    return this.http.get<unknown>(this.apiUrl).pipe(
      map((response) => {
        const parsed = BlogEntriesResponseSchema.parse(response);
        return parsed.data;
      })
    );
  }

  getBlogById(id: number): Observable<Blog> {
    return this.http.get<unknown>(this.apiUrl).pipe(
      map((response) => {
        const parsed = BlogEntriesResponseSchema.parse(response);
        const blog = parsed.data.find((b: Blog) => b.id === id);
        if (!blog) {
          throw new Error(`Blog mit ID ${id} nicht gefunden`);
        }
        return blog;
      })
    );
  }
}