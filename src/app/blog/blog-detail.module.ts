import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogDetailComponent } from './blog-detail.component';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { BlogService } from './blog.service';
import { Blog } from './blog.home';

@Injectable({ providedIn: 'root' })
export class BlogDetailResolver implements Resolve<Blog> {
  constructor(private blogService: BlogService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Blog> {
    const id = Number(route.paramMap.get('id'));
    return this.blogService.getBlogById(id);
  }
}

const routes: Routes = [
  { path: '', component: BlogDetailComponent, resolve: { blog: BlogDetailResolver } }
];

@NgModule({
  imports: [RouterModule.forChild(routes), BlogDetailComponent],
  exports: [RouterModule],
  providers: [BlogDetailResolver]
})
export class BlogDetailModule {} 