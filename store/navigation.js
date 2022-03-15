export const state = () => ({
  season: null,
  availableSeasons: [],
  mainNav: [
    { title: 'Startseite', path: '/' },
    {
      title: 'Liga',
      path: '/league',
      children: [
        { title: 'Ergebnisse', path: '/${season}/league/results' },
        { title: 'Tabelle', path: '/${season}/league/standings' },
        { title: 'Spielplan', path: '/${season}/league/schedule' },
        { title: 'Trades', path: '/league/trades' },
        { title: 'Verletzungen', path: '/${season}/league/injuries' },
        { title: 'Farm Teams', path: '/league/farm' },
        { title: 'Ewige Tabelle', path: '/league/alltime' },
        { title: 'Historie', path: '/league/history' }
      ]
    },
    {
      title: 'Statistiken',
      path: '/stats',
      children: [
        { title: 'Leaders', path: '/${season}/stats/leaders' },
        { title: 'Top 10', path: '/${season}/stats/top10' },
        { title: 'Teamstats', path: '/${season}/stats/teamstats' },
        { title: 'Scorerliste', path: '/${season}/stats/scorer' },
        { title: 'Rekorde', path: '/${season}/stats/records' },
        { title: 'Enforcers & Hitters', path: '/${season}/stats/enforcers' },
        { title: 'Spieler der Woche', path: '/${season}/stats/player-of-the-week' },
        { title: 'Team der Woche', path: '/${season}/stats/team-of-the-week' },
        { title: 'Spieler des Monats', path: '/${season}/stats/player-of-the-month' },
        { title: 'Trophäen', path: '/${season}/stats/trophies' },
        { title: 'MVP', path: '/${season}/stats/mvp' }
      ]
    },
    { title: 'Teams', path: '/${season}/teams' },
    { title: 'Spieler', path: '/players' },
    {
      title: 'Office',
      role: 'GM',
      path: '/office',
      children: [{ title: 'Verträge', path: '/gm/contracts' }]
    },
    {
      title: 'Admin',
      role: 'ADMIN',
      path: '/admin',
      children: [{ title: 'Tools', path: '/admin/tools' }]
    },
    { title: 'Forum', path: '/board' }
  ]
})

export const mutations = {
  setSeason(state, season) {
    state.season = season
  },
  setAvailableSeasons(state, seasons) {
    state.availableSeasons = seasons
  }
}

export const getters = {
  season(state, getters) {
    if (state.season) {
      return state.season
    }
    return getters.latestSeason
  },
  latestSeason(state) {
    return [...state.availableSeasons].pop()
  },
  previousSeason(state) {
    console.log([...state.availableSeasons])
    return 'TOHL12'
  },
  nav(state, _getters, _rootState, rootGetters) {
    return state.mainNav.filter((n) => {
      if (n.role) {
        return rootGetters['user/hasRole'](n.role)
      }
      return true
    })
  }
}
