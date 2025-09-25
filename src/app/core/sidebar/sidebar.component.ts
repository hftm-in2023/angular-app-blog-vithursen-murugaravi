import { AsyncPipe, CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { Component, inject, OnDestroy, OnInit, computed, ChangeDetectionStrategy, signal } from '@angular/core';
import { Observable, Subject, takeUntil, switchMap, of, forkJoin } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { OidcSecurityService, LoginResponse } from 'angular-auth-oidc-client';
import { hasRole } from '../../features/auth/roles';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnInit, OnDestroy {
  private breakpointObserver = inject(BreakpointObserver);
  private readonly oidc = inject(OidcSecurityService);
  private readonly destroy$ = new Subject<void>();

  private readonly authState = signal<LoginResponse>({
    isAuthenticated: false,
    userData: null,
    accessToken: '',
    idToken: '',
    configId: '',
  } as LoginResponse);

  isAuthenticated = computed(() => this.authState().isAuthenticated === true);
  username = computed(() => {
    const data: any = this.authState().userData || {};
    return data?.preferred_username || data?.email || '';
  });
  canAddBlog = computed(() => this.isAuthenticated() && hasRole(this.authState().userData, 'user', 'spa-blog'));

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map((result) => result.matches));

  ngOnInit() {
    this.oidc.isAuthenticated$
      .pipe(
        switchMap((authResult) => {
          if (authResult.isAuthenticated) {
            return forkJoin({
              userData: this.oidc.getUserData(),
              accessToken: this.oidc.getAccessToken(),
              idToken: this.oidc.getIdToken(),
            }).pipe(
              map(({ userData, accessToken, idToken }) => ({
                isAuthenticated: true,
                userData,
                accessToken,
                idToken,
              })),
            );
          } else {
            return of({ isAuthenticated: false, userData: null, accessToken: '', idToken: '' });
          }
        }),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (authState) => {
          this.authState.set({
            ...authState,
            configId: 'default',
          } as LoginResponse);
        },
        error: (error) => {
          console.error('Sidebar: Error in authentication state:', error);
          this.authState.set({
            isAuthenticated: false,
            userData: null,
            accessToken: '',
            idToken: '',
            configId: 'default',
          } as LoginResponse);
        },
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  login() {
    this.oidc.authorize();
  }

  logout() {
    this.oidc.logoff().subscribe({
      next: () => {
        // State will be updated via isAuthenticated$ subscription
      },
      error: (error) => {
        console.error('Logout error:', error);
      },
    });
  }
}