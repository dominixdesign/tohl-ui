<template>
  <img
    :src="require(`~/assets/icons/${icon}.svg`)"
    aria-hidden="true"
    class="hidden h-10 w-10 px-2 lg:block"
  />
</template>

<script>
export default {
  props: {
    icon: String
  }
}
</script>

<style></style>
