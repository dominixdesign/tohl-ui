import { defineNuxtPlugin } from '#app'
import { get, template } from 'lodash-es'
import texts from '~/texts/de'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      t: (path, data = {}) => {
        const text = get(texts, path, path)
        // check for pluralization
        if (text.indexOf('|') > 0) {
          const plurals = text.split('|')
          let compiled
          if (data.count > 1 || data.count < 0) {
            compiled = template(plurals[2])
          } else if (data.count === 1) {
            compiled = template(plurals[1])
          } else if (data.count === 0) {
            compiled = template(plurals[0])
          } else {
            throw new Error('invalid count value: ', data.count)
          }
          return compiled({ count: data.count }).trim()
        }
        return text
      }
    }
  }
})
