export const state = () => ({
  mainNav: [
    { title: 'Startseite', path: '/' },
    {
      title: 'Liga',
      path: '/league',
      children: [{ title: 'Tabelle', path: '/standings' }]
    },
    { title: 'Statistiken', path: '/stats' },
    { title: 'Teams', path: '/teams' },
    { title: 'Spieler', path: '/players' },
    { title: 'Office', path: '/office' },
    { title: 'Lines', path: '/lines' },
    { title: 'Forum', path: '/board' }
  ]
})

export const mutations = {}
