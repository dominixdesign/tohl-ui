import jwt from 'jsonwebtoken'

export const state = () => {
  return {
    username: null,
    mail: null,
    roles: [],
    team: null
  }
}

export const actions = {
  login({ commit }, { access_token, manager }) {
    const { username, roles, mail } = jwt.decode(access_token)
    commit('setUsername', username)
    commit('setMail', mail)
    commit('setRoles', roles)
    commit('setTeam', manager?.team?.teamid)
  }
}

export const mutations = {
  setUsername: (state, username) => (state.username = username),
  setMail: (state, mail) => (state.mail = mail),
  setRoles: (state, roles) => (state.roles = roles),
  setTeam: (state, team) => (state.team = team)
}

export const getters = {
  isLoggedIn: (state) => state.username !== null && state.team !== null
}
