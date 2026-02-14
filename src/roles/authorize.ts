/**
 * Authorization Utilities
 * כלי הרשאות ובדיקת גישה
 */

import { ROLE_DEFINITIONS, ROLE_HIERARCHY } from './roles';
import { Action, Permission, Resource, Role, UserWithRole } from './types';

/**
 * בודק אם לתפקיד יש הרשאה מסוימת
 */
export function roleHasPermission(
  role: Role,
  resource: Resource,
  action: Action
): boolean {
  const definition = ROLE_DEFINITIONS[role];
  if (!definition) return false;

  return definition.permissions.some(
    (p) => p.resource === resource && (p.action === action || p.action === Action.MANAGE)
  );
}

/**
 * בודק אם למשתמש יש הרשאה מסוימת
 */
export function userHasPermission(
  user: UserWithRole,
  resource: Resource,
  action: Action
): boolean {
  return roleHasPermission(user.role, resource, action);
}

/**
 * בודק אם לתפקיד יש לפחות אחת מההרשאות
 */
export function roleHasAnyPermission(
  role: Role,
  permissions: Permission[]
): boolean {
  return permissions.some((p) => roleHasPermission(role, p.resource, p.action));
}

/**
 * בודק אם לתפקיד יש את כל ההרשאות
 */
export function roleHasAllPermissions(
  role: Role,
  permissions: Permission[]
): boolean {
  return permissions.every((p) => roleHasPermission(role, p.resource, p.action));
}

/**
 * מחזיר את כל ההרשאות של תפקיד
 */
export function getPermissionsForRole(role: Role): Permission[] {
  const definition = ROLE_DEFINITIONS[role];
  return definition ? [...definition.permissions] : [];
}

/**
 * בודק אם תפקיד אחד גבוה מהשני בהיררכיה
 */
export function isRoleHigherThan(role: Role, otherRole: Role): boolean {
  const roleIndex = ROLE_HIERARCHY.indexOf(role);
  const otherIndex = ROLE_HIERARCHY.indexOf(otherRole);
  return roleIndex < otherIndex;
}

/**
 * בודק אם תפקיד שווה או גבוה מתפקיד אחר
 */
export function isRoleAtLeast(role: Role, minimumRole: Role): boolean {
  const roleIndex = ROLE_HIERARCHY.indexOf(role);
  const minIndex = ROLE_HIERARCHY.indexOf(minimumRole);
  return roleIndex <= minIndex;
}

/**
 * מחזיר את רמת התפקיד (0 = הגבוה ביותר)
 */
export function getRoleLevel(role: Role): number {
  return ROLE_HIERARCHY.indexOf(role);
}

/**
 * Middleware factory - יוצר פונקציית בדיקת הרשאה
 */
export function requirePermission(resource: Resource, action: Action) {
  return (user: UserWithRole): boolean => {
    return userHasPermission(user, resource, action);
  };
}

/**
 * Middleware factory - יוצר פונקציית בדיקת תפקיד מינימלי
 */
export function requireRole(minimumRole: Role) {
  return (user: UserWithRole): boolean => {
    return isRoleAtLeast(user.role, minimumRole);
  };
}
