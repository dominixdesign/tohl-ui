//import jwt from 'jsonwebtoken'
import { DefaultApolloClient } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { useUserStore } from '@/stores/user'

let jwt
let tokenTimeout

export class AuthService {
  constructor(app) {
    this.app = app
    this.apollo = DefaultApolloClient
  }

  async logout() {
    const userStore = useUserStore()
    const refresh_token = window.localStorage.getItem('refresh_token')
    if (refresh_token) {
      const res = await this.apollo
        .mutate({
          mutation: gql`
            mutation managerLogout($refresh_token: String) {
              logout(refresh_token: $refresh_token)
            }
          `,
          variables: { refresh_token }
        })
        .then(({ data }) => data)
    }

    window.localStorage.removeItem('refresh_token')
    userStore.$reset()
  }

  async login({ username, password, refresh }) {
    const res = await this.apollo
      .mutate({
        mutation: gql`
          mutation managerLogin($username: String!, $password: String!, $refresh: Boolean) {
            login(username: $username, password: $password, refresh: $refresh) {
              access_token
              refresh_token
              manager {
                username
                team {
                  teamid
                }
              }
            }
          }
        `,
        variables: { username, password, refresh }
      })
      .then(({ data }) => data)

    if (res.login.refresh_token) {
      window.localStorage.setItem('refresh_token', res.login.refresh_token)
    }

    await this.setToken(res.login.access_token, res.login.manager)
  }

  async refreshLogin() {
    const refreshToken = window.localStorage.getItem('refresh_token')
    if (refreshToken) {
      try {
        const res = await this.apollo
          .mutate({
            mutation: gql`
              mutation managerLogin($refresh_token: String!) {
                token(refresh_token: $refresh_token) {
                  access_token
                  manager {
                    username
                    team {
                      teamid
                    }
                  }
                }
              }
            `,
            variables: { refresh_token: refreshToken }
          })
          .then(({ data }) => data)
        console.log(res)
        await this.setToken(res.token.access_token, res.token.manager)
      } catch (e) {
        console.log(e)
        this.logout()
      }
    } else {
      this.logout()
    }
  }

  async setToken(token, manager) {
    const userStore = useUserStore()
    const { username, roles, mail, exp } = jwt.decode(token)
    if (exp < parseInt(Date.now() / 1000)) {
      this.app.$apolloHelpers.onLogout()
      throw Error('expired')
    }
    userStore.login({ access_token: token, manager })
    const expiresIn = exp - parseInt(Date.now() / 1000)
    tokenTimeout = window.setTimeout(this.refreshLogin.bind(this), expiresIn * 1000)
    console.log({ expiresIn, tokenTimeout })
    this.loggedIn = true
  }
}
