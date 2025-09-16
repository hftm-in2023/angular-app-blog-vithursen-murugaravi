import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GlobalLoadingComponent } from './shared/global-loading.component';
import { Blog } from './blog/blog.schemas';
import { BlogService } from './blog/blog.service';

@Component({
  selector: 'app-root',
  imports: [RouterModule, GlobalLoadingComponent],
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