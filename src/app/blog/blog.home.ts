import { ChangeDetectionStrategy, Component, EventEmitter, Output, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { Blog } from './blog.schemas';

// Type wird jetzt aus Zod-Schema exportiert

@Component({
  selector: 'app-home',
  templateUrl: './blog.home.html',
  styleUrls: ['./blog.home.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  blogs = input.required<Blog[]>();
  openBlog = output<number>();
  
  onOpenBlog(blogId: number) {
    this.openBlog.emit(blogId);
  }
}