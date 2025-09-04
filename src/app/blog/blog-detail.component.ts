import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { BlogService } from './blog.service';
import { Blog } from './blog.schemas';
import { BlogDetailViewComponent } from './blog-detail.view';
import { SpinnerComponent } from '../shared/spinner.component';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule, BlogDetailViewComponent, SpinnerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogDetailComponent implements OnInit {
  blog = signal<Blog | null>(null);
  loading = signal(true);
  error = signal('');

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
    this.loading.set(true);
    this.error.set('');
    
    this.blogService.getBlogById(id).subscribe({
      next: (blog) => {
        this.blog.set(blog);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Blog konnte nicht geladen werden');
        this.loading.set(false);
        console.error('Fehler beim Laden des Blogs:', err);
      }
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }

  onLike() {
    // Platzhalter für Like-Action (Smart-Komponente reagiert auf View-Event)
    // Hier könnte ein Service-Aufruf erfolgen
  }

  onComment() {
    // Platzhalter für Comment-Action
  }
} 