import { ChangeDetectionStrategy, Component, computed, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OidcSecurityService, LoginResponse } from 'angular-auth-oidc-client';
import { hasRole } from '../auth/roles';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header style="display:flex; align-items:center; justify-content:space-between; padding:12px 16px; border-bottom:1px solid #e0e0e0">
      <a routerLink="/" style="text-decoration:none; color:inherit"><h3 style="margin:0">Blog</h3></a>
      <div style="display:flex; gap:12px; align-items:center">
        <button *ngIf="canAddBlog()" routerLink="/add-blog">Add Blog</button>
        <span *ngIf="isAuthenticated()">{{ username() }}</span>
        <button *ngIf="!isAuthenticated()" (click)="login()">Login</button>
        <button *ngIf="isAuthenticated()" (click)="logout()">Logout</button>
      </div>
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {
  private readonly oidc = inject(OidcSecurityService);
  private readonly destroy$ = new Subject<void>();
  
  private readonly authState = signal<LoginResponse>({
    isAuthenticated: false,
    userData: null,
    accessToken: '',
    idToken: '',
    configId: ''
  } as LoginResponse);

  isAuthenticated = computed(() => this.authState().isAuthenticated === true);
  username = computed(() => {
    const data: any = this.authState().userData || {};
    return data?.preferred_username || data?.email || '';
  });
  canAddBlog = computed(() => this.isAuthenticated() && hasRole(this.authState().userData, 'user', 'spa-blog'));

  ngOnInit() {
    // Subscribe to authentication state changes
    this.oidc.isAuthenticated$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.oidc.getUserData().pipe(
          takeUntil(this.destroy$)
        ).subscribe((userData) => {
          this.authState.set({
            isAuthenticated: true,
            userData,
            accessToken: '',
            idToken: '',
            configId: 'default'
          } as LoginResponse);
        });
      } else {
        this.authState.set({
          isAuthenticated: false,
          userData: null,
          accessToken: '',
          idToken: '',
          configId: 'default'
        } as LoginResponse);
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  login() {
    console.log('Login button clicked, calling oidc.authorize()');
    this.oidc.authorize();
  }

  logout() {
    this.oidc.logoff().subscribe();
  }
}


