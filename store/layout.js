export const state = () => {
  let colormode
  if (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    colormode = 'dark'
  } else {
    colormode = 'light'
  }
  return {
    sidebarOpen: false,
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
  }
}
