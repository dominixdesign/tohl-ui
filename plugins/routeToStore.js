export default async ({ app }, inject) => {
  app.store.watch(
    (state) => state.route.params,
    (state) => {
      if (state.league) {
        app.store.commit('navigation/setSeason', state.season)
      }
    }
  )
}
