import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';

export type Blog = {
  author: string;
  comments: number;
  contentPreview: string;
  createdByMe: boolean;
  id: number;
  likedByMe: boolean;
  likes: number;
  title: string;
};

@Component({
  selector: 'app-home',
  templateUrl: './blog.home.html',
  styleUrls: ['./blog.home.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule]
})
export class HomeComponent {
  @Input({ required: true }) blogs!: Blog[];

  constructor(private router: Router) {}

  viewBlogDetails(blogId: number) {
    this.router.navigate(['/blog', blogId]);
  }
}