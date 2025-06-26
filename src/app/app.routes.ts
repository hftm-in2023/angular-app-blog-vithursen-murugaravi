import { Routes } from '@angular/router';
import { BlogDetailComponent } from './blog/blog-detail.component';
import { HomePageComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'blog/:id', component: BlogDetailComponent }
];
