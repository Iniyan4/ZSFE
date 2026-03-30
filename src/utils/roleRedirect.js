// roleRedirect.js
import { USER_ROLES } from './constants'

export function getRoleRedirectPath(role) {
  switch (role) {
    case USER_ROLES.DONOR:
      return '/donor'
    case USER_ROLES.NGO:
      return '/ngo'
    case USER_ROLES.DELIVERY:
      return '/delivery'
    case USER_ROLES.ADMIN:
      return '/admin'
    default:
      return '/login'
  }
}
