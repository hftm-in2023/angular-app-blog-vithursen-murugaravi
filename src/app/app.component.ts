import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Blog } from './blog/blog.schemas';
import { BlogService } from './blog/blog.service';
import { OidcSecurityService, LoginResponse } from 'angular-auth-oidc-client';
import { HeaderComponent } from './core/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'angular-app-Blog-Vithursen-Murugaravi';
  blogs: Blog[] = [];
  private readonly oidcSecurityService = inject(OidcSecurityService);

  constructor(private blogService: BlogService) {}

  ngOnInit() {
    console.log('AppComponent: Initializing OIDC service...');
    this.oidcSecurityService.checkAuth().subscribe((loginResponse: LoginResponse) => {
      console.log('AppComponent: checkAuth response:', loginResponse);
      // Optionally handle isAuthenticated, userData, tokens here
    });
    this.blogService.getBlogs().subscribe({
      next: (blogs) => (this.blogs = blogs),
      error: (err) => console.error('Fehler beim Laden der Blogs:', err)
    });
  }
}