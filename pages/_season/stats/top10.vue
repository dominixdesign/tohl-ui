<template>
  <div class="py-2 sm:p-6 xl:px-12 mx-auto max-w-screen-2xl">
    <div
      class="font-bold text-xl ml-1 sm:ml-0 mb-3 mt-5"
      v-for="list of Object.keys(top)"
      :key="list"
    >
      <h3>{{ $t(`top10.${list}`) }}</h3>
      <ul
        role="list"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-full"
        v-if="season"
      >
        <li v-for="sortby in top[list]" :key="`${list}-${sortby}`" class="xl:shadow">
          <player-top10
            v-if="list !== 'positions'"
            :season="season"
            :sortby="sortby"
            :position="list === 'goalies' ? 'goalies' : 'all'"
          />
          <player-top10 v-else :season="season" sortby="points" :position="sortby" />
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
      top: {
        offense: ['points', 'goals', 'assists', 'shots', 'ppg', 'shg'],
        defense: ['plusminus', 'pim', 'hits', 'icetime'],
        defense: ['plusminus', 'pim', 'hits', 'icetime'],
        positions: ['C', 'RW', 'LW', 'D'],
        goalies: ['gaa', 'savepercentage', 'shutout', 'assists', 'pim', 'shotsfaced']
      }
    }
  }
}
</script>
