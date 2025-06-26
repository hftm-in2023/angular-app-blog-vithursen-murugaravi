import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'blog/:id', loadChildren: () => import('./blog/blog-detail.module').then(m => m.BlogDetailModule) },
  { path: 'blog', loadChildren: () => import('./blog/blog-overview.module').then(m => m.BlogOverviewModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}