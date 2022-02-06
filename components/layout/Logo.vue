<template>
  <TohlLogo
    aria-hidden="true"
    class="w-auto scale-100 fill-current sm:scale-150"
    :class="inverse ? 'text-white' : 'text-primary-600 dark:text-white'"
  />
</template>

<script>
import TohlLogo from '~/assets/logo-white-small.svg?inline'

export default {
  props: {
    inverse: {
      type: Boolean,
      default: false
    }
  },
  components: {
    TohlLogo
  }
}
</script>
