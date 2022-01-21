import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
  new VuexPersistence({
    reducer: (state) => ({
      navigation: {
        availableSeasons: state.navigation.availableSeasons
      },
      teams: {
        teamNames: state.teams.names
      }
    }),
    storage: window.localStorage
  }).plugin(store)
}
