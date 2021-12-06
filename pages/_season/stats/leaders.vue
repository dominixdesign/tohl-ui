<template>
  <div
    class="
      p-6
      xl:px-12
      mx-auto
      max-w-screen-2xl
      grid grid-cols-1
      gap-4
      md:grid-cols-2
      xl:grid-cols-3
    "
  >
    <div v-for="position in Object.keys(leaders)" :key="position">
      <div class="text-3xl font-bold my-5">{{ $t(position) }}</div>
      <ul role="list" class="grid grid-cols-1 gap-4">
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
        offense: ['points', 'goals', 'assists', 'plusminus', 'pim', 'hits', 'shots', 'icetime'],
        defense: ['points', 'goals', 'assists', 'plusminus', 'pim', 'hits', 'shots', 'icetime'],
        goalies: ['gaa', 'savepercentage', 'shutout']
      }
    }
  }
}
</script>
