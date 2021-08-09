import { validateUserPermissions } from "../utils/validateUserPermissions";
import { useAuth } from "./useAuth";

interface UseCanParams {
  permissions?: string[];
  roles?: string[];
}

export function useCan({ permissions, roles }: UseCanParams) {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return false;
  }

  const userHasValidPermissions = validateUserPermissions({
    user, 
    permissions,
    roles
  });

  return userHasValidPermissions;
}