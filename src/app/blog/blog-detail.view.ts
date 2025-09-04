import { ChangeDetectionStrategy, Component, EventEmitter, Output, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { Blog } from './blog.schemas';

@Component({
  selector: 'app-blog-detail-view',
  templateUrl: './blog-detail.view.html',
  styleUrls: ['./blog-detail.view.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogDetailViewComponent {
  blog = input<Blog | null>(null);
  loading = input(false);
  error = input('');

  back = output<void>();
  like = output<void>();
  comment = output<void>();

  onBack() {
    this.back.emit();
  }

  onLike() {
    this.like.emit();
  }

  onComment() {
    this.comment.emit();
  }
}


