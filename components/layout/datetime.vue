<template>
  <time :datetime="iso">{{ displayedDate }}</time>
</template>

<script>
import { formatISO, format, formatRelative } from 'date-fns'
import { de } from 'date-fns/locale'

export default {
  props: ['date', 'format'],
  computed: {
    displayedDate() {
      if (this.format === 'relative') {
        return formatRelative(this.date, new Date(), { locale: de })
      }
      return format(this.date, 'MM/dd/yyyy')
    },
    iso() {
      return formatISO(this.date)
    }
  }
}
</script>
