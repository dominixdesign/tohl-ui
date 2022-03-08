import jwt from 'jsonwebtoken'

export const state = () => {
  return {
    username: null,
    mail: null,
    roles: [],
    team: null,
    token: null
  }
}

export const actions = {
  login({ commit }, { access_token, manager }) {
    const { username, roles, mail } = jwt.decode(access_token)
    commit('setToken', access_token)
    commit('setUsername', username)
    commit('setMail', mail)
    commit('setRoles', roles)
    commit('setTeam', manager?.team?.teamid)
  },
  logout({ commit }) {
    commit('setToken', null)
    commit('setUsername', null)
    commit('setMail', null)
    commit('setRoles', [])
    commit('setTeam', null)
  }
}

export const mutations = {
  setUsername: (state, username) => (state.username = username),
  setMail: (state, mail) => (state.mail = mail),
  setRoles: (state, roles) => (state.roles = roles),
  setTeam: (state, team) => (state.team = team),
  setToken: (state, token) => (state.token = token)
}

export const getters = {
  token: (state) => state.token,
  hasRole: (state) => (role) => state.roles.includes(role),
  team: (state) => state.team,
  isLoggedIn: (state) => state.username !== null && state.team !== null
}
