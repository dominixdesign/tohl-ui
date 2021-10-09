import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
  new VuexPersistence({
    reducer: (state) => ({ availableSeasons: state.navigation.availableSeasons }),
    storage: window.localStorage
  }).plugin(store)
}
