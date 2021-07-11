import jwt from 'jsonwebtoken'

export const state = () => {
  return {
    username: null,
    mail: null,
    roles: []
  }
}

export const actions = {
  login({ commit }, { access_token, refresh_token }) {
    const { username, roles, mail } = jwt.decode(access_token)
    commit('setUsername', username)
    commit('setMail', mail)
    commit('setRoles', roles)
    if (refresh_token) {
      localStorage.setItem('refresh_token', refresh_token)
    }
  }
}

export const mutations = {
  setUsername: (state, username) => (state.username = username),
  setMail: (state, mail) => (state.mail = mail),
  setRoles: (state, roles) => (state.roles = roles)
}

export const getters = {
  isLoggedIn: () => false
}
