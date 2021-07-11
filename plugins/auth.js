import { AuthService } from './auth.class'

export default async ({ app }, inject) => {
  const authApi = new AuthService(app)

  const token = await app.$apolloHelpers.getToken()
  console.log({ token })
  inject('authApi', authApi)
}
