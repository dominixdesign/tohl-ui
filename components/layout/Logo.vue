<template>
  <component :is="logo" aria-hidden="true" class="w-auto transform scale-150" />
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
