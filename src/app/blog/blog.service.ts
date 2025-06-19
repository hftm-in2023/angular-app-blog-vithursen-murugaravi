import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog } from './blog.home';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class BlogService {
  private apiUrl = 'https://d-cap-blog-backend---v2.whitepond-b96fee4b.westeurope.azurecontainerapps.io/entries?updatedAfter=2022-03-10T12%3A15%3A50';

  constructor(private http: HttpClient) {}

  getBlogs(): Observable<Blog[]> {
    return this.http.get<{ data: Blog[] }>(this.apiUrl).pipe(
      map(response => response.data)
    );
  }
}