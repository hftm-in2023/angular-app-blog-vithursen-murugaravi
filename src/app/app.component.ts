import { Component, OnInit, inject } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { BlogService } from './blog/blog.service';
import { Blog } from './blog/blog.schemas';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './core/sidebar/sidebar.component';
@Component({
  selector: 'app-root',
  imports: [RouterModule, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'angular-app-Blog-Vithursen-Murugaravi';
  blogs: Blog[] = [];
  private readonly oidcSecurityService = inject(OidcSecurityService);

  constructor(private blogService: BlogService) {}

  ngOnInit() {
    this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated, userData }) => {
      console.log('app is authenticated', isAuthenticated);
      console.log('app user data', userData);
      if (isAuthenticated) {
        this.blogService.getBlogs().subscribe((blogs) => {
          this.blogs = blogs;
        });
      }
    });
  }
}