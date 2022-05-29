import { createApp, provide, h } from 'vue'
import { createPinia } from 'pinia'
import './index.scss'

import App from './App.vue'
import router from './router'
import { DefaultApolloClient } from '@vue/apollo-composable'
import apolloClient from './plugins/apolloClient'
import { AuthService } from './plugins/auth.class'

const app = createApp({
  setup() {
    // Apollo
    provide(DefaultApolloClient, apolloClient)

    // Auth Service
    const authService = new AuthService(apolloClient)

    // check if current token is still valid
    const token = localStorage.getItem('tohl-token')
    if (token) {
      try {
        authService.setToken(token)
      } catch (err) {
        console.log('token invalid, try refresh')
        authService.refreshLogin()
      }
    } else {
      console.log('no access_token found, try refresh_token')
      authService.refreshLogin()
    }

    app.provide('authService', authService)
  },

  render: () => h(App)
})

app.use(createPinia())
app.use(router)

app.mount('#app')
