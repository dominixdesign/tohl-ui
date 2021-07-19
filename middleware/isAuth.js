export default ({ app, error, route }) => {
  console.log(route)
  const hasToken = !!app.$apolloHelpers.getToken()
  if (!hasToken) {
    error({
      statusCode: 503,
      message: 'Zugang verweigert',
      sub: 'Man muss ein angemeldeter GM sein, um diese Seite sehen zu können.'
    })
  }
}
