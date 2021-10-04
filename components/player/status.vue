<template>
  <span :class="classes">{{ display }}{{ injury }}</span>
</template>

<script>
export default {
  props: {
    cd: Number,
    ij: String
  },
  computed: {
    display() {
      return this.cd === 0 ? 'OK' : this.cd
    },
    injury() {
      if (this.ij) {
        return ` (${this.ij})`
      }
      return null
    },
    classes() {
      const classes = []
      if (this.cd === 0 && this.ij) {
        classes.push('opacity-70')
      } else if (this.cd === 0) {
        classes.push('text-green-400')
      } else if (this.cd >= 95) {
        classes.push('text-yellow-400')
      } else if (this.cd < 95) {
        classes.push('text-red-400')
      }
      return classes.join(' ')
    }
  }
}
</script>
