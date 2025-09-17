import { Routes } from '@angular/router';

export const addBlogPageRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./add-blog-page.component').then(m => m.AddBlogPageComponent)
  }
];


