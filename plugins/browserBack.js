import { App } from '@capacitor/app'

export default async ({ app }, inject) => {
  App.addListener('backButton', () => {
    app.router.back()
  })
}
