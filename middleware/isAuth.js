export default ({ app, error, route }) => {
  const hasToken = !!app.$apolloHelpers.getToken()
  if (!hasToken) {
    error({
      statusCode: 403,
      message: 'Zugang verweigert',
      sub: 'Man muss ein angemeldeter GM sein, um diese Seite sehen zu können.'
    })
  }
}
