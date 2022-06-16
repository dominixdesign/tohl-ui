<template>
  <div class="mx-auto max-w-screen-2xl py-2 sm:p-6 xl:px-12">
    <layout-headline :showSeasonSelect="true">Top 10</layout-headline>
    <div
      class="ml-1 mb-3 mt-5 text-xl font-bold sm:ml-0"
      v-for="list of Object.keys(top)"
      :key="list"
    >
      <h3 class="my-5 text-3xl font-bold">{{ $t(`top10.${list}`) }}</h3>
      <ul
        role="list"
        class="grid max-w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
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

<script setup>
const route = useRoute()

const season = `TOHL${route.params.season}`
const top = {
  players: ['points', 'goals', 'assists', 'shots', 'ppg', 'shg', 'plusminus', 'icetime'],
  enforcer: ['pim', 'hits', 'enforcerpoints', 'fightswon'],
  positions: ['C', 'RW', 'LW', 'D'],
  goalies: ['gaa', 'savepercentage', 'shutout', 'assists', 'pim', 'shotsfaced']
}
</script>
