export const state = () => {
  let colormode
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    colormode = 'dark'
  } else {
    colormode = 'light'
  }
  return {
    sidebarOpen: false,
    navOpen: false,
    profileOpen: false,
    colormode
  }
}

export const mutations = {
  openSidebar(state) {
    state.sidebarOpen = true
  },
  closeSidebar(state) {
    state.sidebarOpen = false
  },
  openNav(state) {
    state.navOpen = true
  },
  closeNav(state) {
    state.navOpen = false
  },
  openProfile(state) {
    state.profileOpen = true
  },
  closeProfile(state) {
    state.profileOpen = false
  },
  enableDarkmode(state) {
    state.colormode = 'dark'
  },
  disableDarkmode(state) {
    state.colormode = 'light'
  },
  selectPlayer(state, { line, block, pos }) {
    if (line && block && pos) {
      state.playerSelectData = { line, block, pos, toString: `${line}-${block}-${pos}` }
    } else {
      state.playerSelectData = {}
    }
  }
}
