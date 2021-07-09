export const state = () => {
  return {
    username: null,
    token: null,
    mail: null
  }
}

export const actions = {}

export const mutations = {}

export const getters = {
  isLoggedIn: (state) => state.username !== null
}
