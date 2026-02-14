/**
 * Shekalon Role Framework
 * מסגרת תפקידים - שקלון
 */

export { Role, Resource, Action } from './types';
export type { Permission, RoleDefinition, UserWithRole } from './types';

export { ROLE_DEFINITIONS, ROLE_HIERARCHY } from './roles';

export {
  VIEWER_PERMISSIONS,
  USER_PERMISSIONS,
  ACCOUNTANT_PERMISSIONS,
  MANAGER_PERMISSIONS,
  ADMIN_PERMISSIONS,
  SUPER_ADMIN_PERMISSIONS,
} from './permissions';

export {
  roleHasPermission,
  userHasPermission,
  roleHasAnyPermission,
  roleHasAllPermissions,
  getPermissionsForRole,
  isRoleHigherThan,
  isRoleAtLeast,
  getRoleLevel,
  requirePermission,
  requireRole,
} from './authorize';
