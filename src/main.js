import { createApp, provide, h } from 'vue'
import { createPinia } from 'pinia'
import './index.scss'

import App from './App.vue'
import router from './router'
import { DefaultApolloClient } from '@vue/apollo-composable'
import apolloClient from './plugins/apolloClient'
import auth from './plugins/auth'

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },

  render: () => h(App)
})

app.use(createPinia())
app.use(router)
app.use(auth)

app.mount('#app')
