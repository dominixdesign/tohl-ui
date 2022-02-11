export default ({ store, error, route }) => {
  if (!store.getters['user/isLoggedIn']) {
    error({
      statusCode: 403,
      message: 'Zugang verweigert',
      sub: 'Man muss ein angemeldeter GM sein, um diese Seite sehen zu können.'
    })
  }
}
