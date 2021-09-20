<template>
  <div class="p-6 xl:px-12 mx-auto max-w-screen-2xl">
    <div v-for="position in Object.keys(leaders)" :key="position">
      <div>{{ position }}</div>
      <ul
        role="list"
        class="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
      >
        <li v-for="sortby in leaders[position]" :key="`${sortby}-${position}`">
          <player-leader :season="season" :sortby="sortby" :position="position" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  async asyncData({ params }) {
    const season = params.season
    return { season }
  },
  data() {
    return {
      leaders: {
        offense: ['points', 'goals', 'assists', 'plusminus', 'pim', 'hits', 'shots'],
        defense: ['points', 'goals', 'assists', 'plusminus', 'pim', 'hits', 'shots']
      }
    }
  }
}
</script>
