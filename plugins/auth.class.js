import jwt from 'jsonwebtoken'
import authLoginGql from '~/queries/auth/login.gql'
import authTokenGql from '~/queries/auth/token.gql'

export class AuthService {
  constructor(app) {
    this.app = app
    this.apollo = app.apolloProvider.clients.defaultClient
  }

  async login({ username, password, refresh }) {
    const res = await this.apollo
      .mutate({
        mutation: authLoginGql,
        variables: { username, password, refresh }
      })
      .then(({ data }) => data)

    await this.setToken(res.login.access_token)
  }

  async refreshLogin() {
    const refreshToken = window.localStorage.getItem('refresh_token')
    if (refreshToken) {
      try {
        const res = await this.apollo
          .mutate({
            mutation: authTokenGql,
            variables: { refresh_token: refreshToken }
          })
          .then(({ data }) => data)

        await this.setToken(res.login.access_token)
      } catch (e) {}
    }
  }

  async setToken(token) {
    console.log({ token })
    const { username, roles, mail, exp } = jwt.decode(token)
    if (exp < parseInt(Date.now() / 1000)) {
      throw Error('expired')
    }
    this.userdata = { username, roles, mail }
    this.loggedIn = true
    await this.app.$apolloHelpers.onLogin(token)
  }

  isLoggedIn() {
    return this.loggedIn
  }
}