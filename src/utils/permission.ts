import { UserModule } from '@/store/modules/user'

export const checkPermission = (value: string[]): boolean => {
  if (value && value instanceof Array && value.length > 0) {
    const roles = UserModule.roles
    const permissionRoles = value
    const hasPermission = roles.some((role: any) => {
      return permissionRoles.includes(role)
    })
    return hasPermission
  } else {
    console.error(`need roles! Like v-permission="['admin','editor']"`)
    return false
  }
}
