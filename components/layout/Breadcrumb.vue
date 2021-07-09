<template>
  <ol class="px-6 flex-shrink-0 flex items-end">
    <li class="font-serif font-headline font-extralight uppercase">
      <NuxtLink to="/">TOHL</NuxtLink>
    </li>
    <li class="pr-2" v-if="crumbs[0].path !== '/'">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 translate-x-1 -translate-y-0.5 transform"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
          clip-rule="evenodd"
        />
        <path
          fill-rule="evenodd"
          d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
          clip-rule="evenodd"
        />
      </svg>
    </li>
    <li
      v-for="(crumb, index) in crumbs"
      :key="index"
      class="font-serif font-headline font-extralight uppercase"
    >
      <NuxtLink :to="crumb.path">{{ $t(crumb.title) }}</NuxtLink>
    </li>
  </ol>
</template>

<script>
export default {
  name: 'Breadcrumb',
  computed: {
    crumbs() {
      const fullPath = this.$route.fullPath
      const params = fullPath.startsWith('/')
        ? fullPath.substring(1).split('/')
        : fullPath.split('/')
      const crumbs = []
      let path = ''
      params.forEach((param, index) => {
        path = `${path}/${param}`
        const match = this.$router.match(path)
        if (match.name !== null) {
          crumbs.push({
            title: param,
            ...match
          })
        }
      })
      return crumbs
    }
  }
}
</script>
