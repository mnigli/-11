/**
 * Permission Definitions
 * הגדרות הרשאות לכל משאב
 */

import { Action, Permission, Resource } from './types';

function perm(resource: Resource, action: Action): Permission {
  return { resource, action };
}

/** הרשאות צפייה בלבד */
export const VIEWER_PERMISSIONS: Permission[] = [
  perm(Resource.TRANSACTIONS, Action.READ),
  perm(Resource.BUDGETS, Action.READ),
  perm(Resource.REPORTS, Action.READ),
  perm(Resource.CATEGORIES, Action.READ),
];

/** הרשאות משתמש רגיל */
export const USER_PERMISSIONS: Permission[] = [
  ...VIEWER_PERMISSIONS,
  perm(Resource.TRANSACTIONS, Action.CREATE),
  perm(Resource.TRANSACTIONS, Action.UPDATE),
  perm(Resource.TRANSACTIONS, Action.DELETE),
  perm(Resource.BUDGETS, Action.CREATE),
  perm(Resource.BUDGETS, Action.UPDATE),
  perm(Resource.CATEGORIES, Action.CREATE),
  perm(Resource.CATEGORIES, Action.UPDATE),
  perm(Resource.REPORTS, Action.EXPORT),
  perm(Resource.SETTINGS, Action.READ),
  perm(Resource.SETTINGS, Action.UPDATE),
];

/** הרשאות רואה חשבון */
export const ACCOUNTANT_PERMISSIONS: Permission[] = [
  ...USER_PERMISSIONS,
  perm(Resource.TRANSACTIONS, Action.EXPORT),
  perm(Resource.BUDGETS, Action.DELETE),
  perm(Resource.BUDGETS, Action.EXPORT),
  perm(Resource.BILLING, Action.READ),
  perm(Resource.BILLING, Action.EXPORT),
];

/** הרשאות מנהל */
export const MANAGER_PERMISSIONS: Permission[] = [
  ...ACCOUNTANT_PERMISSIONS,
  perm(Resource.USERS, Action.READ),
  perm(Resource.USERS, Action.CREATE),
  perm(Resource.USERS, Action.UPDATE),
  perm(Resource.CATEGORIES, Action.DELETE),
  perm(Resource.BILLING, Action.CREATE),
  perm(Resource.BILLING, Action.UPDATE),
  perm(Resource.AUDIT_LOG, Action.READ),
];

/** הרשאות מנהל מערכת */
export const ADMIN_PERMISSIONS: Permission[] = [
  ...MANAGER_PERMISSIONS,
  perm(Resource.USERS, Action.DELETE),
  perm(Resource.SETTINGS, Action.MANAGE),
  perm(Resource.BILLING, Action.DELETE),
  perm(Resource.AUDIT_LOG, Action.EXPORT),
];

/** הרשאות מנהל על - גישה מלאה */
export const SUPER_ADMIN_PERMISSIONS: Permission[] = [
  ...ADMIN_PERMISSIONS,
  perm(Resource.USERS, Action.MANAGE),
  perm(Resource.TRANSACTIONS, Action.MANAGE),
  perm(Resource.BUDGETS, Action.MANAGE),
  perm(Resource.REPORTS, Action.MANAGE),
  perm(Resource.CATEGORIES, Action.MANAGE),
  perm(Resource.BILLING, Action.MANAGE),
  perm(Resource.AUDIT_LOG, Action.MANAGE),
];
