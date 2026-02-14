/**
 * Role Framework - Type Definitions
 * מסגרת תפקידים - הגדרות טיפוסים
 */

export enum Role {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  MANAGER = 'manager',
  ACCOUNTANT = 'accountant',
  USER = 'user',
  VIEWER = 'viewer',
}

export enum Resource {
  USERS = 'users',
  TRANSACTIONS = 'transactions',
  BUDGETS = 'budgets',
  REPORTS = 'reports',
  CATEGORIES = 'categories',
  SETTINGS = 'settings',
  BILLING = 'billing',
  AUDIT_LOG = 'audit_log',
}

export enum Action {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
  EXPORT = 'export',
  MANAGE = 'manage',
}

export interface Permission {
  resource: Resource;
  action: Action;
}

export interface RoleDefinition {
  name: Role;
  label: string;
  labelHe: string;
  description: string;
  descriptionHe: string;
  permissions: Permission[];
  inherits?: Role;
}

export interface UserWithRole {
  id: string;
  email: string;
  role: Role;
}
