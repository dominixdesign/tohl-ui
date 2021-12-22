import jwt from 'jsonwebtoken'
import authLoginGql from '~/queries/auth/login.gql'
import authTokenGql from '~/queries/auth/token.gql'

export class AuthService {
  constructor(app) {
    this.userdata = {}
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

    this.userdata = res.login
    if (res.login.refresh_token) {
      window.localStorage.setItem('refresh_token', res.login.refresh_token)
    }

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

        this.userdata = res.token
        await this.setToken(res.token.access_token)
      } catch (e) {}
    }
  }

  async setToken(token) {
    const { username, roles, mail, exp } = jwt.decode(token)
    if (exp < parseInt(Date.now() / 1000)) {
      this.app.$apolloHelpers.onLogout()
      throw Error('expired')
    }
    this.loggedIn = true
    await this.app.$apolloHelpers.onLogin(token)
  }

  isLoggedIn() {
    return this.loggedIn
  }

  get username() {
    return this.userdata.manager?.email
  }

  get teamid() {
    console.log(this.userdata)
    return this.userdata.manager?.team?.teamid
  }
}
