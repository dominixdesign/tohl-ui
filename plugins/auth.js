import { AuthService } from './auth.class'

export default async ({ app }, inject) => {
  const authService = new AuthService(app)

  // check if current token is still valid
  const token = await app.$apolloHelpers.getToken()
  if (token) {
    try {
      await authService.setToken(token)
    } catch (err) {
      console.log('token invalid, try refresh')
      await authService.refreshLogin()
    }
  } else {
    console.log('no access_token found, try refresh_token')
    await authService.refreshLogin()
  }

  inject('authService', authService)
}
