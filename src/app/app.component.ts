import { Component, OnInit } from '@angular/core';
import { HomeComponent, Blog } from './blog/blog.home';
import { BlogService } from './blog/blog.service';

@Component({
  selector: 'app-root',
  imports: [HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'angular-app-Blog-Vithursen-Murugaravi';
  blogs: Blog[] = [];

  constructor(private blogService: BlogService) {}

  ngOnInit() {
    this.blogService.getBlogs().subscribe({
      next: (blogs) => (this.blogs = blogs),
      error: (err) => console.error('Fehler beim Laden der Blogs:', err)
    });
  }
}