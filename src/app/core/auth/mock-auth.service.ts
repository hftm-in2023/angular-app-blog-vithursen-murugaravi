import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MockAuthService {
  private readonly isAuthenticatedSignal = signal(false);
  private readonly userDataSignal = signal<any>(null);

  readonly isAuthenticated = computed(() => this.isAuthenticatedSignal());
  readonly userData = computed(() => this.userDataSignal());
  readonly username = computed(() => {
    const user = this.userDataSignal();
    return user?.preferred_username || user?.email || 'student@hftm.ch';
  });

  login() {
    console.log('MockAuth: Simulating login...');
    // Simulate successful login
    this.userDataSignal.set({
      preferred_username: 'student@hftm.ch',
      email: 'student@hftm.ch',
      realm_access: {
        roles: ['user', 'default-roles-blog']
      },
      resource_access: {
        'spa-blog': {
          roles: ['user']
        }
      }
    });
    this.isAuthenticatedSignal.set(true);
    console.log('MockAuth: Login successful');
  }

  logout() {
    console.log('MockAuth: Logging out...');
    this.isAuthenticatedSignal.set(false);
    this.userDataSignal.set(null);
    console.log('MockAuth: Logout successful');
  }

  hasRole(role: string, clientId?: string): boolean {
    const user = this.userDataSignal();
    if (!user) return false;

    const realmRoles = user.realm_access?.roles || [];
    const resourceRoles = clientId ? (user.resource_access?.[clientId]?.roles || []) : [];
    
    return [...realmRoles, ...resourceRoles].includes(role);
  }
}
