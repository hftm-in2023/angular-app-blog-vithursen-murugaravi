export function extractRoles(userData: unknown, clientId?: string): string[] {
  const data: any = userData || {};

  const realmRoles: string[] = data?.realm_access?.roles ?? [];
  const resourceRoles: string[] = clientId ? (data?.resource_access?.[clientId]?.roles ?? []) : [];

  const preferredClient = data?.azp && data?.resource_access?.[data.azp]?.roles
    ? (data.resource_access[data.azp].roles as string[])
    : [];

  return Array.from(new Set<string>([...realmRoles, ...resourceRoles, ...preferredClient]));
}

export function hasRole(userData: unknown, role: string, clientId?: string): boolean {
  return extractRoles(userData, clientId).includes(role);
}