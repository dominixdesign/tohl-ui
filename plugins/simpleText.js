import { defineNuxtPlugin } from '#app'
import { get } from 'lodash-es'
import texts from '~/texts/de'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      t: (path) => get(texts, path, path)
    }
  }
})
