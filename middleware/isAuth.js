export default ({ app, error, route }) => {
  console.log(route)
  const hasToken = !!app.$apolloHelpers.getToken()
  if (!hasToken) {
    error({
      errorCode: 503,
      message: 'You are not allowed to see this'
    })
  }
}
