import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { BlogService } from './blog.service';
import { Blog } from './blog.home';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule]
})
export class BlogDetailComponent implements OnInit {
  blog: Blog | null = null;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      if (id) {
        this.loadBlog(id);
      }
    });
  }

  loadBlog(id: number) {
    this.loading = true;
    this.error = '';
    
    this.blogService.getBlogById(id).subscribe({
      next: (blog) => {
        this.blog = blog;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Blog konnte nicht geladen werden';
        this.loading = false;
        console.error('Fehler beim Laden des Blogs:', err);
      }
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }
} 