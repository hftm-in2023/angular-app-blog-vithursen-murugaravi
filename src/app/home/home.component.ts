import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../shared/spinner.component';
import { HomeComponent } from '../blog/blog.home';
import { Blog } from '../blog/blog.schemas';
import { BlogStore } from '../blog/blog.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, HomeComponent, SpinnerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent implements OnInit {
  blogs = this.blogStore.blogs;
  loading = this.blogStore.loading;

  constructor(private blogStore: BlogStore, private router: Router) {}

  ngOnInit() {
    this.blogStore.loadBlogs();
  }

  onOpenBlog(blogId: number) {
    this.router.navigate(['/blog', blogId]);
  }
} 