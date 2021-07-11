import jwt from 'jsonwebtoken'
import authLoginGql from '~/queries/auth/login.gql'

export class AuthService {
  constructor(app) {
    this.app = app
    this.apollo = app.apolloProvider.clients.defaultClient
  }

  async login({ username, password, refresh }) {
    try {
      const res = await this.apollo
        .mutate({
          mutation: authLoginGql,
          variables: { username, password, refresh }
        })
        .then(({ data }) => data)

      this.loggedIn = true
      await this.setToken(res.login.access_token)
    } catch (e) {
      throw new Error(e)
    }
  }

  async setToken(token) {
    const { username, roles, mail } = jwt.decode(token)
    this.userdata = { username, roles, mail }
    await this.app.$apolloHelpers.onLogin(token)
  }

  isLoggedIn() {
    return this.loggedIn
  }
}
