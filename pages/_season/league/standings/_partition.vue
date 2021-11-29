<template>
  <div class="py-2 max-w-screen-2xl">
    <div class="flex flex-col space-y-6">
      <div class="bg-gray-100 dark:bg-primary-800 xl:shadow">
        <div class="block">
          <div class="border-b border-gray-200 px-2">
            <nav class="-mb-px flex space-x-8" aria-label="Tabs">
              <!-- Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" -->
              <nuxt-link
                v-for="table in ['league', 'conferences', 'divisions']"
                :key="table"
                :to="
                  table === 'league'
                    ? `/${season}/league/standings/`
                    : `/${season}/league/standings/${table}`
                "
                class="
                  border-transparent
                  hover:text-primary-200 hover:border-primary-200
                  whitespace-nowrap
                  py-4
                  px-1
                  border-b-2
                  font-medium
                  text-sm
                "
                :class="
                  table === partition
                    ? 'text-primary-200 border-primary-200 font-bold'
                    : 'text-primary-400'
                "
              >
                {{ $t(table) }}
              </nuxt-link>
            </nav>
          </div>
        </div>
      </div>
      <div
        class="grid-cols-1 xl:grid-cols-2 gap-3 max-w-full"
        :class="tables.length > 1 ? 'grid' : ''"
      >
        <div
          v-for="table in tables"
          :key="table.title"
          class="bg-gray-100 dark:bg-primary-800 xl:shadow w-full overflow-auto"
        >
          <league-standings :season="season" :title="table.title" :filter="table.filter" />
        </div>
      </div>
      <div class="bg-gray-100 dark:bg-primary-800 xl:shadow p-6" v-if="!$apollo.loading">
        <h3 class="font-serif font-headline font-extralight uppercase pb-4 text-xl">Legende</h3>
        <div class="grid grid-cols-3 gap-4">
          <div v-for="(dd, dt) in legend" :key="dt">
            <span class="font-medium">{{ dt }}</span> <span>&ndash; {{ dd }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ params, i18n }) {
    const season = params.season
    let partition = params.partition
    let tables
    if (partition === 'conferences') {
      tables = [
        { title: 'Funkturm', filter: { conference: 'funkturm' } },
        { title: 'Kirchturm', filter: { conference: 'kirchturm' } }
      ]
    } else if (partition === 'divisions') {
      tables = [
        { title: 'Kindl', filter: { division: 'kindl' } },
        { title: 'Heineken', filter: { division: 'heineken' } },
        { title: 'Erdinger', filter: { division: 'erdinger' } },
        { title: 'Corona', filter: { division: 'corona' } }
      ]
    } else {
      tables = [{ title: i18n.t('league') }]
      partition = 'league'
    }

    return { season, partition, tables }
  },
  data() {
    return {
      legend: {
        GP: 'Games Played / Spiele',
        W: 'Wins / Siege',
        L: 'Losses / Niederlagen',
        T: 'Ties / Unentschieden',
        P: 'Points / Punkte',
        GF: 'Goals For / erzielte Tore',
        GA: 'Goals Against / bekommenen Tore',
        DIFF: 'Goal Differential / Tordifferenz',
        'WIN%': 'Win Percentage / Siegquote',
        STREAK: 'Streak / aktuelle Serie'
      }
    }
  }
}
</script>
