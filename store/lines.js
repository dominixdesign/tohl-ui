import gql from 'graphql-tag'
const axios = {}

export const state = () => ({
  selected: '5v5',
  lines: {
    '5v5-1-lw': { fname: 'Malcom', lname: 'Brooks', ov: 80, pos: 'LW' },
    '5v5-1-c': { fname: 'Ramasan', lname: 'Tagajev', ov: 82, pos: 'C' },
    '5v5-1-rw': { fname: 'Mika', lname: 'Harlekin', ov: 78, pos: 'RW' },
    '5v5-1-d1': { fname: 'Sergio', lname: 'Domestos', ov: 78, pos: 'D' },
    '5v5-1-d2': { fname: 'Thorfin', lname: 'Brandshaug', ov: 80, pos: 'D' },
    'G-1-g': { fname: 'Govert', lname: 'VanderWalletjes', ov: 84, pos: 'G' }
  },
  structure: {
    '5v5': {
      1: [
        ['lw', 'c', 'rw'],
        ['d1', 'd2']
      ],
      2: [
        ['lw', 'c', 'rw'],
        ['d1', 'd2']
      ],
      3: [
        ['lw', 'c', 'rw'],
        ['d1', 'd2']
      ],
      4: [
        ['lw', 'c', 'rw'],
        ['d1', 'd2']
      ]
    },
    PP: {
      1: [
        ['lw', 'c', 'rw'],
        ['d1', 'd2']
      ],
      2: [
        ['lw', 'c', 'rw'],
        ['d1', 'd2']
      ],
      3: [
        ['c', 'w'],
        ['d1', 'd2']
      ],
      4: [
        ['c', 'w'],
        ['d1', 'd2']
      ]
    },
    PK: {
      1: [
        ['c', 'w'],
        ['d1', 'd2']
      ],
      2: [
        ['c', 'w'],
        ['d1', 'd2']
      ],
      3: [['c'], ['d1', 'd2']],
      4: [['c'], ['d1', 'd2']]
    },
    G: {
      1: [['g']]
    },
    EA: {
      1: [['ea']],
      2: [['ea']]
    }
  }
})

// getters
export const getters = {
  structure: (state) => state.structure,
  getSelected: (state) => state.selected,
  getFirstLevel: (state) => Object.keys(state.structure),
  getSelectedStructure: (state) => state.structure[state.selected],
  getPlayer: (state) => (line, block, pos) => state.lines[`${line}-${block}-${pos}`] || {}
}

// actions
export const actions = {
  async save({ state, dispatch }) {
    const url = 'https://my-tohl.org/tohl/lines/process-save-lines.php?'
    const queryParts = []
    queryParts.push('team=' + window['_TOHL_TEAM'].id)
    queryParts.push('teamid=' + window['_TOHL_TEAM'].ros_pos)

    // // erste reihe even strength
    // queryParts.push('line[even['1']][LW]=' + state.lines['5v5-1-lw'].ros_pos)
    // queryParts.push('line[even['1']][RW]=' + state.lines['5v5-1-rw'].ros_pos)
    // queryParts.push('line[even['1']][C]=' + state.lines['5v5-1-c'].ros_pos)
    // queryParts.push('line[even['1']][RD]=' + state.lines['5v5-1-d1'].ros_pos)
    // queryParts.push('line[even['1']][LD]=' + state.lines['5v5-1-d2'].ros_pos)
    // // zweite reihe even strength
    // queryParts.push('line[even['2']][LW]=' + state.lines['5v5-2-lw'].ros_pos)
    // queryParts.push('line[even['2']][RW]=' + state.lines['5v5-2-rw'].ros_pos)
    // queryParts.push('line[even['2']][C]=' + state.lines['5v5-2-c'].ros_pos)
    // queryParts.push('line[even['2']][RD]=' + state.lines['5v5-2-d1'].ros_pos)
    // queryParts.push('line[even['2']][LD]=' + state.lines['5v5-2-d2'].ros_pos)
    // // dritte reihe even strength
    // queryParts.push('line[even['3']][LW]=' + state.lines['5v5-3-lw'].ros_pos)
    // queryParts.push('line[even['3']][RW]=' + state.lines['5v5-3-rw'].ros_pos)
    // queryParts.push('line[even['3']][C]=' + state.lines['5v5-3-c'].ros_pos)
    // queryParts.push('line[even['3']][RD]=' + state.lines['5v5-3-d1'].ros_pos)
    // queryParts.push('line[even['3']][LD]=' + state.lines['5v5-3-d2'].ros_pos)
    // // vierte reihe even strength
    // queryParts.push('line[even['4']][LW]=' + state.lines['5v5-4-lw'].ros_pos)
    // queryParts.push('line[even['4']][RW]=' + state.lines['5v5-4-rw'].ros_pos)
    // queryParts.push('line[even['4']][C]=' + state.lines['5v5-4-c'].ros_pos)
    // queryParts.push('line[even['4']][RD]=' + state.lines['5v5-4-d1'].ros_pos)
    // queryParts.push('line[even['4']][LD]=' + state.lines['5v5-4-d2'].ros_pos)

    // erste reihe 5-4 powerplay
    queryParts.push('line[pp11][LW]=' + state.lines['PP-1-lw'].ros_pos)
    queryParts.push('line[pp11][RW]=' + state.lines['PP-1-rw'].ros_pos)
    queryParts.push('line[pp11][C]=' + state.lines['PP-1-c'].ros_pos)
    queryParts.push('line[pp11][RD]=' + state.lines['PP-1-d1'].ros_pos)
    queryParts.push('line[pp11][LD]=' + state.lines['PP-1-d2'].ros_pos)
    // zweite reihe 5-4 powerplay
    queryParts.push('line[pp12][LW]=' + state.lines['PP-2-lw'].ros_pos)
    queryParts.push('line[pp12][RW]=' + state.lines['PP-2-rw'].ros_pos)
    queryParts.push('line[pp12][C]=' + state.lines['PP-2-c'].ros_pos)
    queryParts.push('line[pp12][RD]=' + state.lines['PP-2-d1'].ros_pos)
    queryParts.push('line[pp12][LD]=' + state.lines['PP-2-d2'].ros_pos)

    // erste reihe 4-3 powerplay
    queryParts.push('line[pp21][W]=' + state.lines['PP-3-w'].ros_pos)
    queryParts.push('line[pp21][C]=' + state.lines['PP-3-c'].ros_pos)
    queryParts.push('line[pp21][RD]=' + state.lines['PP-3-d1'].ros_pos)
    queryParts.push('line[pp21][LD]=' + state.lines['PP-3-d2'].ros_pos)
    // zweite reihe 4-3 powerplay
    queryParts.push('line[pp22][W]=' + state.lines['PP-4-w'].ros_pos)
    queryParts.push('line[pp22][C]=' + state.lines['PP-4-c'].ros_pos)
    queryParts.push('line[pp22][RD]=' + state.lines['PP-4-d1'].ros_pos)
    queryParts.push('line[pp22][LD]=' + state.lines['PP-4-d2'].ros_pos)

    // erste reihe 4-5 unterzahl
    queryParts.push('line[pk11][W]=' + state.lines['PK-1-w'].ros_pos)
    queryParts.push('line[pk11][C]=' + state.lines['PK-1-c'].ros_pos)
    queryParts.push('line[pk11][RD]=' + state.lines['PK-1-d1'].ros_pos)
    queryParts.push('line[pk11][LD]=' + state.lines['PK-1-d2'].ros_pos)
    // zweite reihe 4-5 unterzahl
    queryParts.push('line[pk12][W]=' + state.lines['PK-2-w'].ros_pos)
    queryParts.push('line[pk12][C]=' + state.lines['PK-2-c'].ros_pos)
    queryParts.push('line[pk12][RD]=' + state.lines['PK-2-d1'].ros_pos)
    queryParts.push('line[pk12][LD]=' + state.lines['PK-2-d2'].ros_pos)

    // erste reihe 3-4 unterzahl
    queryParts.push('line[pk21][C]=' + state.lines['PK-3-c'].ros_pos)
    queryParts.push('line[pk21][RD]=' + state.lines['PK-3-d1'].ros_pos)
    queryParts.push('line[pk21][LD]=' + state.lines['PK-3-d2'].ros_pos)
    // zweite reihe 3-4 unterzahl
    queryParts.push('line[pk22][C]=' + state.lines['PK-4-c'].ros_pos)
    queryParts.push('line[pk22][RD]=' + state.lines['PK-4-d1'].ros_pos)
    queryParts.push('line[pk22][LD]=' + state.lines['PK-4-d2'].ros_pos)

    // goalie
    queryParts.push('line[goalie][starting]=' + state.lines['G-1-g'].ros_pos)

    // extra attacker
    queryParts.push('line[extra][1]=' + state.lines['EA-1-ea'].ros_pos)
    queryParts.push('line[extra][2]=' + state.lines['EA-2-ea'].ros_pos)

    await axios
      .post(url + queryParts.join('&'))
      .then((response) => response.status)
      .catch((err) => console.warn(err))
  },
  async loadLines({ commit, rootGetters }) {
    const apollo = this.app.apolloProvider.defaultClient
    const { data } = await apollo.query({
      query: gql`
        query lines($team: String!, $season: String!) {
          lines(team: $team, season: $season) {
            season
            gameday
            team {
              teamid
            }
            lines_json
          }
        }
      `,
      variables: {
        team: rootGetters['user/team'],
        season: rootGetters['navigation/season']
      }
    })

    const lines = JSON.parse(data.lines.lines_json)
    console.log(lines)

    // map old lines to new lines:
    commit('setLines', {
      '5v5-1-lw': rootGetters['roster/getByID'](lines.even['1'].LW),
      '5v5-1-rw': rootGetters['roster/getByID'](lines.even['1'].RW),
      '5v5-1-c': rootGetters['roster/getByID'](lines.even['1'].C),
      '5v5-1-d1': rootGetters['roster/getByID'](lines.even['1'].LD),
      '5v5-1-d2': rootGetters['roster/getByID'](lines.even['1'].RD),
      '5v5-2-lw': rootGetters['roster/getByID'](lines.even['2'].LW),
      '5v5-2-rw': rootGetters['roster/getByID'](lines.even['2'].RW),
      '5v5-2-c': rootGetters['roster/getByID'](lines.even['2'].C),
      '5v5-2-d1': rootGetters['roster/getByID'](lines.even['2'].LD),
      '5v5-2-d2': rootGetters['roster/getByID'](lines.even['2'].RD),
      '5v5-3-lw': rootGetters['roster/getByID'](lines.even['3'].LW),
      '5v5-3-rw': rootGetters['roster/getByID'](lines.even['3'].RW),
      '5v5-3-c': rootGetters['roster/getByID'](lines.even['3'].C),
      '5v5-3-d1': rootGetters['roster/getByID'](lines.even['3'].LD),
      '5v5-3-d2': rootGetters['roster/getByID'](lines.even['3'].RD),
      '5v5-4-lw': rootGetters['roster/getByID'](lines.even['4'].LW),
      '5v5-4-rw': rootGetters['roster/getByID'](lines.even['4'].RW),
      '5v5-4-c': rootGetters['roster/getByID'](lines.even['4'].C),
      '5v5-4-d1': rootGetters['roster/getByID'](lines.even['4'].LD),
      '5v5-4-d2': rootGetters['roster/getByID'](lines.even['4'].RD),

      'PP-1-lw': rootGetters['roster/getByID'](lines.pp1['1'].LW),
      'PP-1-rw': rootGetters['roster/getByID'](lines.pp1['1'].RW),
      'PP-1-c': rootGetters['roster/getByID'](lines.pp1['1'].C),
      'PP-1-d1': rootGetters['roster/getByID'](lines.pp1['1'].LD),
      'PP-1-d2': rootGetters['roster/getByID'](lines.pp1['1'].RD),
      'PP-2-lw': rootGetters['roster/getByID'](lines.pp1['2'].LW),
      'PP-2-rw': rootGetters['roster/getByID'](lines.pp1['2'].RW),
      'PP-2-c': rootGetters['roster/getByID'](lines.pp1['2'].C),
      'PP-2-d1': rootGetters['roster/getByID'](lines.pp1['2'].LD),
      'PP-2-d2': rootGetters['roster/getByID'](lines.pp1['2'].RD),

      'PP-3-w': rootGetters['roster/getByID'](lines.pp2['1'].W),
      'PP-3-c': rootGetters['roster/getByID'](lines.pp2['1'].C),
      'PP-3-d1': rootGetters['roster/getByID'](lines.pp2['1'].LD),
      'PP-3-d2': rootGetters['roster/getByID'](lines.pp2['1'].RD),
      'PP-4-w': rootGetters['roster/getByID'](lines.pp2['2'].W),
      'PP-4-c': rootGetters['roster/getByID'](lines.pp2['2'].C),
      'PP-4-d1': rootGetters['roster/getByID'](lines.pp2['2'].LD),
      'PP-4-d2': rootGetters['roster/getByID'](lines.pp2['2'].RD),

      'PK-1-w': rootGetters['roster/getByID'](lines.pk1['1'].W),
      'PK-1-c': rootGetters['roster/getByID'](lines.pk1['1'].C),
      'PK-1-d1': rootGetters['roster/getByID'](lines.pk1['1'].LD),
      'PK-1-d2': rootGetters['roster/getByID'](lines.pk1['1'].RD),
      'PK-2-w': rootGetters['roster/getByID'](lines.pk1['2'].W),
      'PK-2-c': rootGetters['roster/getByID'](lines.pk1['2'].C),
      'PK-2-d1': rootGetters['roster/getByID'](lines.pk1['2'].LD),
      'PK-2-d2': rootGetters['roster/getByID'](lines.pk1['2'].RD),

      'PK-3-c': rootGetters['roster/getByID'](lines.pk2['1'].C),
      'PK-3-d1': rootGetters['roster/getByID'](lines.pk2['1'].LD),
      'PK-3-d2': rootGetters['roster/getByID'](lines.pk2['1'].RD),
      'PK-4-c': rootGetters['roster/getByID'](lines.pk2['2'].C),
      'PK-4-d1': rootGetters['roster/getByID'](lines.pk2['2'].LD),
      'PK-4-d2': rootGetters['roster/getByID'](lines.pk2['2'].RD),

      'G-1-g': rootGetters['roster/getByID'](lines.goalie),

      'EA-1-ea': rootGetters['roster/getByID'](lines.extra['1']),
      'EA-2-ea': rootGetters['roster/getByID'](lines.extra['2'])
    })
  },
  setPlayerOfLine({ dispatch, commit }, payload) {
    commit('setPlayerOfLine', payload)
    dispatch('layout/changed', null, { root: true })
  }
}

// mutations
export const mutations = {
  select(state, line) {
    state.selected = line
  },
  setLines(state, lines) {
    console.log(lines)
    state.lines = lines
  },
  setPlayerOfLine(state, { line, player }) {
    state.lines = { ...state.lines, [line]: player }
  },
  pushProductToCart(state, { id }) {
    state.items.push({
      id,
      quantity: 1
    })
  }
}
