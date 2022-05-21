import { createApp, provide, h } from 'vue'
import { createPinia } from 'pinia'
import './index.css'

import App from './App.vue'
import router from './router'
import { DefaultApolloClient } from '@vue/apollo-composable'
import apolloClient from './plugins/apolloClient'

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },

  render: () => h(App)
})

app.use(createPinia())
app.use(router)

app.mount('#app')
