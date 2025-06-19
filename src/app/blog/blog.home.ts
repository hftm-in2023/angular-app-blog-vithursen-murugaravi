import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

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
  imports: [CommonModule, MatCardModule, MatButtonModule]
})
export class HomeComponent {
  @Input({ required: true }) blogs!: Blog[];
}