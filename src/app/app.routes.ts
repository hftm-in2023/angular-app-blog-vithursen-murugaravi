import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.HomePageComponent),
    data: { preload: true }
  },
  {
    path: 'blog/:id',
    loadComponent: () => import('./blog/blog-detail.component').then(m => m.BlogDetailComponent),
    data: { preload: true }
  }
];
