import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogDetailComponent } from './blog/blog-detail.component';
import { HomePageComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'blog/:id', component: BlogDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}