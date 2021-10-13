import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
  new VuexPersistence({
    reducer: (state) => ({
      availableSeasons: state.navigation.availableSeasons,
      teamNames: state.teams.names
    }),
    storage: window.localStorage
  }).plugin(store)
}
