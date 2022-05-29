import jwt_decode from 'jwt-decode'
import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    username: null,
    mail: null,
    roles: [],
    team: null,
    token: null
  }),
  getters: {
    getToken: (state) => state.token,
    hasRole: (state) => (role) => state.roles.includes(role),
    getTeam: (state) => state.team,
    isLoggedIn: (state) => state.username !== null && state.team !== null
  },
  actions: {
    login({ access_token, manager }) {
      const { username, roles, mail } = jwt_decode(access_token)
      this.token = access_token
      this.username = username
      this.mail = mail
      this.roles = roles
      this.team = manager?.team?.teamid
    }
  }
})
