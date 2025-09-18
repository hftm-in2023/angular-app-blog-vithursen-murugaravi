import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Blog } from './blog/blog.schemas';
import { BlogService } from './blog/blog.service';
import { OidcSecurityService, LoginResponse } from 'angular-auth-oidc-client';
import { HeaderMockComponent } from './core/header/header-mock.component';

@Component({
  selector: 'app-root',
  imports: [RouterModule, HeaderMockComponent],
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
    
    // Initialize OIDC with error handling
    try {
      this.oidcSecurityService.checkAuth().subscribe({
        next: (loginResponse: LoginResponse) => {
          console.log('AppComponent: checkAuth response:', loginResponse);
          console.log('AppComponent: isAuthenticated:', loginResponse.isAuthenticated);
          console.log('AppComponent: userData:', loginResponse.userData);
        },
        error: (error) => {
          console.error('AppComponent: checkAuth error:', error);
          console.error('AppComponent: Error details:', JSON.stringify(error, null, 2));
        }
      });
    } catch (error) {
      console.error('AppComponent: Error initializing OIDC:', error);
    }
    
    this.blogService.getBlogs().subscribe({
      next: (blogs) => (this.blogs = blogs),
      error: (err) => console.error('Fehler beim Laden der Blogs:', err)
    });
  }
}