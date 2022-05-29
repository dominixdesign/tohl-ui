import jwt_decode from 'jwt-decode'
import { useApolloClient, useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { useUserStore } from '@/stores/user'

let tokenTimeout

export class AuthService {
  constructor(apolloClient) {
    this.apollo = apolloClient
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

  async refreshLogin() {
    const refreshToken = window.localStorage.getItem('refresh_token')
    if (refreshToken) {
      try {
        const res = await this.apollo
          .mutate({
            mutation: gql`
              mutation managerLoginRefresh($refresh_token: String!) {
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
    const { username, roles, mail, exp } = jwt_decode(token)
    if (exp < parseInt(Date.now() / 1000)) {
      throw Error('expired')
    }
    userStore.login({ access_token: token, manager })
    const expiresIn = exp - parseInt(Date.now() / 1000)
    tokenTimeout = window.setTimeout(this.refreshLogin.bind(this), expiresIn * 1000)
    this.loggedIn = true
  }
}
