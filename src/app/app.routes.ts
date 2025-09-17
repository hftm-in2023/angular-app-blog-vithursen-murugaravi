import { Routes } from '@angular/router';
import { isAuthenticatedGuard } from './core/auth/is-authenticated.guard';

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
  },
  {
    path: 'add-blog',
    loadChildren: () => import('./features/add-blog-page/add-blog-page.routes').then(m => m.addBlogPageRoutes),
    canActivate: [isAuthenticatedGuard]
  }
];
