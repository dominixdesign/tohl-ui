export const state = () => ({
  season: 'TOHL11',
  mainNav: [
    { title: 'Startseite', path: '/' },
    {
      title: 'Liga',
      path: '/league',
      children: [
        { title: 'Ergebnisse', path: '/${season}/league/results' },
        { title: 'Tabelle', path: '/${season}/league/standings/' },
        { title: 'Spielplan', path: '/${season}/league/schedule' },
        { title: 'Trades', path: '/league/trades' },
        { title: 'Verletzungen', path: '/league/injuries' },
        { title: 'Farm Teams', path: '/league/farm' },
        { title: 'Ewige Tabelle', path: '/league/alltime' },
        { title: 'Historie', path: '/league/history' }
      ]
    },
    { title: 'Statistiken', path: '/stats' },
    { title: 'Teams', path: '/teams' },
    { title: 'Spieler', path: '/players' },
    { title: 'Office', path: '/office' },
    { title: 'Lines', path: '/lines' },
    { title: 'Forum', path: '/board' }
  ]
})

export const mutations = {
  setSeason(state, season) {
    state.season = season
  }
}
