import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MockAuthService } from '../auth/mock-auth.service';

@Component({
  selector: 'app-header-mock',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header style="display:flex; align-items:center; justify-content:space-between; padding:12px 16px; border-bottom:1px solid #e0e0e0; background-color: #f0f0f0;">
      <a routerLink="/" style="text-decoration:none; color:inherit"><h3 style="margin:0">Blog</h3></a>
      <div style="display:flex; gap:12px; align-items:center">
        <button *ngIf="canAddBlog()" routerLink="/add-blog" style="padding: 8px 16px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">Add Blog</button>
        <span *ngIf="isAuthenticated()" style="font-weight: bold;">{{ username() }}</span>
        <button *ngIf="!isAuthenticated()" (click)="login()" style="padding: 8px 16px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer;">Login</button>
        <button *ngIf="isAuthenticated()" (click)="logout()" style="padding: 8px 16px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer;">Logout</button>
      </div>
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderMockComponent {
  private readonly mockAuth = inject(MockAuthService);

  isAuthenticated = computed(() => this.mockAuth.isAuthenticated());
  username = computed(() => this.mockAuth.username());
  canAddBlog = computed(() => this.isAuthenticated() && this.mockAuth.hasRole('user', 'spa-blog'));

  login() {
    this.mockAuth.login();
  }

  logout() {
    this.mockAuth.logout();
  }
}
