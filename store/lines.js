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

    // erste reihe even strength
    queryParts.push('line[even1][LW]=' + state.lines['5v5-1-lw'].ros_pos)
    queryParts.push('line[even1][RW]=' + state.lines['5v5-1-rw'].ros_pos)
    queryParts.push('line[even1][C]=' + state.lines['5v5-1-c'].ros_pos)
    queryParts.push('line[even1][RD]=' + state.lines['5v5-1-d1'].ros_pos)
    queryParts.push('line[even1][LD]=' + state.lines['5v5-1-d2'].ros_pos)
    // zweite reihe even strength
    queryParts.push('line[even2][LW]=' + state.lines['5v5-2-lw'].ros_pos)
    queryParts.push('line[even2][RW]=' + state.lines['5v5-2-rw'].ros_pos)
    queryParts.push('line[even2][C]=' + state.lines['5v5-2-c'].ros_pos)
    queryParts.push('line[even2][RD]=' + state.lines['5v5-2-d1'].ros_pos)
    queryParts.push('line[even2][LD]=' + state.lines['5v5-2-d2'].ros_pos)
    // dritte reihe even strength
    queryParts.push('line[even3][LW]=' + state.lines['5v5-3-lw'].ros_pos)
    queryParts.push('line[even3][RW]=' + state.lines['5v5-3-rw'].ros_pos)
    queryParts.push('line[even3][C]=' + state.lines['5v5-3-c'].ros_pos)
    queryParts.push('line[even3][RD]=' + state.lines['5v5-3-d1'].ros_pos)
    queryParts.push('line[even3][LD]=' + state.lines['5v5-3-d2'].ros_pos)
    // vierte reihe even strength
    queryParts.push('line[even4][LW]=' + state.lines['5v5-4-lw'].ros_pos)
    queryParts.push('line[even4][RW]=' + state.lines['5v5-4-rw'].ros_pos)
    queryParts.push('line[even4][C]=' + state.lines['5v5-4-c'].ros_pos)
    queryParts.push('line[even4][RD]=' + state.lines['5v5-4-d1'].ros_pos)
    queryParts.push('line[even4][LD]=' + state.lines['5v5-4-d2'].ros_pos)

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
  loadLines({ commit, rootGetters }, lines) {
    // map old lines to new lines:
    commit('setLines', {
      '5v5-1-lw': rootGetters['roster/getByRosPos'](lines.even1.LW),
      '5v5-1-rw': rootGetters['roster/getByRosPos'](lines.even1.RW),
      '5v5-1-c': rootGetters['roster/getByRosPos'](lines.even1.C),
      '5v5-1-d1': rootGetters['roster/getByRosPos'](lines.even1.LD),
      '5v5-1-d2': rootGetters['roster/getByRosPos'](lines.even1.RD),
      '5v5-2-lw': rootGetters['roster/getByRosPos'](lines.even2.LW),
      '5v5-2-rw': rootGetters['roster/getByRosPos'](lines.even2.RW),
      '5v5-2-c': rootGetters['roster/getByRosPos'](lines.even2.C),
      '5v5-2-d1': rootGetters['roster/getByRosPos'](lines.even2.LD),
      '5v5-2-d2': rootGetters['roster/getByRosPos'](lines.even2.RD),
      '5v5-3-lw': rootGetters['roster/getByRosPos'](lines.even3.LW),
      '5v5-3-rw': rootGetters['roster/getByRosPos'](lines.even3.RW),
      '5v5-3-c': rootGetters['roster/getByRosPos'](lines.even3.C),
      '5v5-3-d1': rootGetters['roster/getByRosPos'](lines.even3.LD),
      '5v5-3-d2': rootGetters['roster/getByRosPos'](lines.even3.RD),
      '5v5-4-lw': rootGetters['roster/getByRosPos'](lines.even4.LW),
      '5v5-4-rw': rootGetters['roster/getByRosPos'](lines.even4.RW),
      '5v5-4-c': rootGetters['roster/getByRosPos'](lines.even4.C),
      '5v5-4-d1': rootGetters['roster/getByRosPos'](lines.even4.LD),
      '5v5-4-d2': rootGetters['roster/getByRosPos'](lines.even4.RD),

      'PP-1-lw': rootGetters['roster/getByRosPos'](lines.pp11.LW),
      'PP-1-rw': rootGetters['roster/getByRosPos'](lines.pp11.RW),
      'PP-1-c': rootGetters['roster/getByRosPos'](lines.pp11.C),
      'PP-1-d1': rootGetters['roster/getByRosPos'](lines.pp11.LD),
      'PP-1-d2': rootGetters['roster/getByRosPos'](lines.pp11.RD),
      'PP-2-lw': rootGetters['roster/getByRosPos'](lines.pp12.LW),
      'PP-2-rw': rootGetters['roster/getByRosPos'](lines.pp12.RW),
      'PP-2-c': rootGetters['roster/getByRosPos'](lines.pp12.C),
      'PP-2-d1': rootGetters['roster/getByRosPos'](lines.pp12.LD),
      'PP-2-d2': rootGetters['roster/getByRosPos'](lines.pp12.RD),

      'PP-3-w': rootGetters['roster/getByRosPos'](lines.pp21.W),
      'PP-3-c': rootGetters['roster/getByRosPos'](lines.pp21.C),
      'PP-3-d1': rootGetters['roster/getByRosPos'](lines.pp21.LD),
      'PP-3-d2': rootGetters['roster/getByRosPos'](lines.pp21.RD),
      'PP-4-w': rootGetters['roster/getByRosPos'](lines.pp22.W),
      'PP-4-c': rootGetters['roster/getByRosPos'](lines.pp22.C),
      'PP-4-d1': rootGetters['roster/getByRosPos'](lines.pp22.LD),
      'PP-4-d2': rootGetters['roster/getByRosPos'](lines.pp22.RD),

      'PK-1-w': rootGetters['roster/getByRosPos'](lines.pk11.W),
      'PK-1-c': rootGetters['roster/getByRosPos'](lines.pk11.C),
      'PK-1-d1': rootGetters['roster/getByRosPos'](lines.pk11.LD),
      'PK-1-d2': rootGetters['roster/getByRosPos'](lines.pk11.RD),
      'PK-2-w': rootGetters['roster/getByRosPos'](lines.pk12.W),
      'PK-2-c': rootGetters['roster/getByRosPos'](lines.pk12.C),
      'PK-2-d1': rootGetters['roster/getByRosPos'](lines.pk12.LD),
      'PK-2-d2': rootGetters['roster/getByRosPos'](lines.pk12.RD),

      'PK-3-c': rootGetters['roster/getByRosPos'](lines.pk21.C),
      'PK-3-d1': rootGetters['roster/getByRosPos'](lines.pk21.LD),
      'PK-3-d2': rootGetters['roster/getByRosPos'](lines.pk21.RD),
      'PK-4-c': rootGetters['roster/getByRosPos'](lines.pk22.C),
      'PK-4-d1': rootGetters['roster/getByRosPos'](lines.pk22.LD),
      'PK-4-d2': rootGetters['roster/getByRosPos'](lines.pk22.RD),

      'G-1-g': rootGetters['roster/getByRosPos'](lines.goalie.starting),

      'EA-1-ea': rootGetters['roster/getByRosPos'](lines.extra[1]),
      'EA-2-ea': rootGetters['roster/getByRosPos'](lines.extra[2])
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
