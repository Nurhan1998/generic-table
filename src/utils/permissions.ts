import { EPermissionAction, IPermission, IProfile } from 'store/auth/types';


export const buildPermission = (permission: IPermission, action: EPermissionAction = EPermissionAction.VIEW): string =>
  `${permission.appName}.${action.toString()}_${permission.modelName}`;


export const hasPermission = (
  profile: IProfile,
  permission: IPermission,
  action: EPermissionAction = EPermissionAction.VIEW
): boolean => profile.permissions.includes(buildPermission(permission, action));

export const hasPermissions = (
  profile: IProfile,
  permission: IPermission,
  actions: Array<EPermissionAction> = [EPermissionAction.VIEW]
): boolean => {
  const permissions = actions.map(item => buildPermission(permission, item));
  return profile.permissions.filter(item => permissions.includes(item)).length === permissions.length;
};
