import remove from 'lodash.remove'
import gql from 'graphql-tag'

const axios = {}

export const state = () => ({
  selected: 'G',
  currentTeam: null,
  player: [],
  pro: [],
  scratch: [],
  farm: [],
  limits: {
    C: [3, 6],
    LW: [3, 6],
    RW: [3, 6],
    D: [6, 9],
    G: [2, 2],
    all: [20, 20]
  }
})

export const mutations = {
  selectPos(state, pos) {
    state.selected = pos
  },
  set(state, players) {
    state.player = players
  },
  setCurrentTeam(state, team) {
    state.currentTeam = team
  },
  setTeam(state, { team, players }) {
    state[team] = players.sort((a, b) => {
      if (a.lname > b.lname) return 1
      if (a.lname < b.lname) return -1
      return 0
    })
  }
}

export const actions = {
  async load({ commit, getters, dispatch, rootGetters }, { team }) {
    if (team === getters.currentTeam) {
      return
    }
    const apollo = this.app.apolloProvider.defaultClient
    const { data } = await apollo.query({
      query: gql`
        query roster($teamsim: String!, $season: ID!) {
          roster(teamsim: $teamsim, season: $season) {
            id
            fname
            display_fname
            display_lname
            hand
            lname
            nation
            seasondata {
              roster
              number
              age
              pos
              position @client(always: true)
              cd
              ij
              it
              sp
              st
              en
              du
              di
              sk
              pa
              pc
              df
              sc
              ex
              ld
              ov
            }
          }
        }
      `,
      variables: {
        teamsim: rootGetters['user/team'],
        season: rootGetters['navigation/season']
      }
    })
    const roster = data.roster

    commit('setCurrentTeam', team)
    const teams = ['pro', 'scratch', 'farm']
    roster.map((p) => {
      if (p.seasondata.ij.match(/S\d/)) {
        // Sperre
        p.status = 5
      } else if (p.seasondata.cd !== '0' && parseInt(p.seasondata.cd) >= 95) {
        // angeschlagen
        p.status = 2
      } else if (p.seasondata.cd !== '0' && parseInt(p.seasondata.cd) < 95) {
        // verletzt
        p.status = 3
      } else if (p.seasondata.ij === 'HO') {
        // trainingslager
        p.status = 4
      } else {
        p.status = 1
      }
      p.pos = p.seasondata.pos
      return p
    })
    teams.forEach((team) => {
      commit('setTeam', {
        team,
        players: roster.filter((p) => p.seasondata.roster === team)
      })
    })
    commit('set', roster)
    dispatch('lines/loadLines', undefined, { root: true })
  },
  async save({ state, dispatch }) {
    console.log('roster/save', state)
    const url = 'https://my-tohl.org/tohl/lines/process-save-roster.php?'
    const queryParts = []
    queryParts.push('team=' + window['_TOHL_TEAM'].id)
    queryParts.push('teamid=' + window['_TOHL_TEAM'].ros_pos)
    state.pro.forEach((p) => {
      queryParts.push('proteam[]=' + p.ros_pos)
    })
    state.scratch.forEach((p) => {
      queryParts.push('scrateam[]=' + p.ros_pos)
    })
    state.farm.forEach((p) => {
      queryParts.push('farmteam[]=' + p.ros_pos)
    })

    await axios
      .post(url + queryParts.join('&'))
      .then((response) => response.status)
      .catch((err) => console.warn(err))
  },
  movePlayer({ commit, state, dispatch }, payload) {
    dispatch('layout/changed', null, { root: true })
    const fromTeam = remove(
      state[payload.fromTeam],
      (p) => p.fname !== payload.player.fname && p.lname !== payload.player.lname
    )
    const toTeam = state[payload.toTeam].slice()
    toTeam.push(payload.player)
    commit('setTeam', { team: payload.fromTeam, players: fromTeam })
    commit('setTeam', { team: payload.toTeam, players: toTeam })
  }
}

// getters
export const getters = {
  get: (state) => state.player,
  currentTeam: (state) => state.currentTeam,
  getPro: (state) => state.pro,
  getByRosPos: (state) => (rospos) =>
    state.player.filter((p) => p.ros_pos.toString() === rospos.toString()).pop(),
  getByID: (state) => (playerid) => state.player.filter((p) => p.id === playerid).pop(),
  getDressedByPos: (state) => (pos) =>
    [...state['pro'], ...state['farm']].filter((p) => pos.includes(p.pos)),
  getByTeamAndPos: (state) => (team, pos) => state[team].filter((p) => pos.includes(p.pos)),
  getSelected: (state) => state.selected,
  getForwards: (state) =>
    state.player.filter((p) => p.pos === 'LW' || p.pos === 'RW' || p.pos === 'C'),
  getDefender: (state) => state.player.filter((p) => p.pos === 'D'),
  getGoalies: (state) => state.player.filter((p) => p.pos === 'G'),
  isInLimits: (state, getters) => (pos) => {
    return (
      getters.getByTeamAndPos('pro', pos).length >= state.limits[pos][0] &&
      getters.getByTeamAndPos('pro', pos).length <= state.limits[pos][1]
    )
  },
  isInLimitsLess: (state, getters) => (pos) =>
    getters.getByTeamAndPos('pro', pos).length >= state.limits[pos][0],
  isInLimitsTop: (state, getters) => (pos) =>
    getters.getByTeamAndPos('pro', pos).length <= state.limits[pos][1]
}
