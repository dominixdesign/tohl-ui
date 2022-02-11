import jwt from 'jsonwebtoken'
import authLoginGql from '~/queries/auth/login.gql'
import authLogoutGql from '~/queries/auth/logout.gql'
import authTokenGql from '~/queries/auth/token.gql'

let tokenTimeout

export class AuthService {
  constructor(app) {
    this.app = app
    this.apollo = app.apolloProvider.clients.defaultClient
  }

  async logout() {
    const refresh_token = window.localStorage.getItem('refresh_token')
    if (refresh_token) {
      const res = await this.apollo
        .mutate({
          mutation: authLogoutGql,
          variables: { refresh_token }
        })
        .then(({ data }) => data)
    }

    window.localStorage.removeItem('refresh_token')
    this.app.store.dispatch('user/logout')
    this.app.$apolloHelpers.onLogout()
  }

  async login({ username, password, refresh }) {
    const res = await this.apollo
      .mutate({
        mutation: authLoginGql,
        variables: { username, password, refresh }
      })
      .then(({ data }) => data)

    if (res.login.refresh_token) {
      window.localStorage.setItem('refresh_token', res.login.refresh_token)
    }

    await this.setToken(res.token.access_token, res.token.manager)
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
        console.log(res)
        await this.setToken(res.token.access_token, res.token.manager)
      } catch (e) {
        console.log(e)
      }
    } else {
      this.logout()
    }
  }

  async setToken(token, manager) {
    const { username, roles, mail, exp } = jwt.decode(token)
    if (exp < parseInt(Date.now() / 1000)) {
      this.app.$apolloHelpers.onLogout()
      throw Error('expired')
    }
    this.app.store.dispatch('user/login', { access_token: token, manager })
    const expiresIn = exp - parseInt(Date.now() / 1000)
    tokenTimeout = window.setTimeout(this.refreshLogin.bind(this), expiresIn * 1000)
    console.log({ expiresIn, tokenTimeout })
    this.loggedIn = true
    await this.app.$apolloHelpers.onLogin(token, undefined, { expires: 0 })
  }
}
