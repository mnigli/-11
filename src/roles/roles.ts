/**
 * Role Definitions
 * הגדרות תפקידים
 */

import {
  ACCOUNTANT_PERMISSIONS,
  ADMIN_PERMISSIONS,
  MANAGER_PERMISSIONS,
  SUPER_ADMIN_PERMISSIONS,
  USER_PERMISSIONS,
  VIEWER_PERMISSIONS,
} from './permissions';
import { Role, RoleDefinition } from './types';

export const ROLE_DEFINITIONS: Record<Role, RoleDefinition> = {
  [Role.SUPER_ADMIN]: {
    name: Role.SUPER_ADMIN,
    label: 'Super Admin',
    labelHe: 'מנהל על',
    description: 'Full system access with all permissions',
    descriptionHe: 'גישה מלאה למערכת עם כל ההרשאות',
    permissions: SUPER_ADMIN_PERMISSIONS,
  },
  [Role.ADMIN]: {
    name: Role.ADMIN,
    label: 'Admin',
    labelHe: 'מנהל מערכת',
    description: 'System administrator with user and settings management',
    descriptionHe: 'מנהל מערכת עם ניהול משתמשים והגדרות',
    permissions: ADMIN_PERMISSIONS,
    inherits: Role.MANAGER,
  },
  [Role.MANAGER]: {
    name: Role.MANAGER,
    label: 'Manager',
    labelHe: 'מנהל',
    description: 'Manages users, billing and has access to audit logs',
    descriptionHe: 'מנהל משתמשים, חיובים וגישה ליומן ביקורת',
    permissions: MANAGER_PERMISSIONS,
    inherits: Role.ACCOUNTANT,
  },
  [Role.ACCOUNTANT]: {
    name: Role.ACCOUNTANT,
    label: 'Accountant',
    labelHe: 'רואה חשבון',
    description: 'Financial data management with export capabilities',
    descriptionHe: 'ניהול נתונים פיננסיים עם יכולות ייצוא',
    permissions: ACCOUNTANT_PERMISSIONS,
    inherits: Role.USER,
  },
  [Role.USER]: {
    name: Role.USER,
    label: 'User',
    labelHe: 'משתמש',
    description: 'Standard user with personal finance management',
    descriptionHe: 'משתמש רגיל עם ניהול פיננסי אישי',
    permissions: USER_PERMISSIONS,
    inherits: Role.VIEWER,
  },
  [Role.VIEWER]: {
    name: Role.VIEWER,
    label: 'Viewer',
    labelHe: 'צופה',
    description: 'Read-only access to financial data',
    descriptionHe: 'גישת צפייה בלבד לנתונים פיננסיים',
    permissions: VIEWER_PERMISSIONS,
  },
};

/** רשימת התפקידים מהגבוה לנמוך */
export const ROLE_HIERARCHY: Role[] = [
  Role.SUPER_ADMIN,
  Role.ADMIN,
  Role.MANAGER,
  Role.ACCOUNTANT,
  Role.USER,
  Role.VIEWER,
];
