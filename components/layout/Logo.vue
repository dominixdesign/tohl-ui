<template>
  <component
    :is="logo"
    aria-hidden="true"
    class="w-auto flex-shrink-0 transform scale-150 translate-x-3 translate-y-1"
  />
</template>

<script>
export default {
  computed: {
    logo() {
      return () =>
        import(
          /* webpackChunkName: `icon/[request]` */ `~/static/logo-white-small.svg?inline`
        )
    },
  },
}
</script>
