<template>
  <div class="p-6 xl:px-12 mx-auto max-w-screen-2xl">
    <div class="flex flex-col space-y-6">
      <div class="bg-gray-100 dark:bg-primary-800 xl:shadow">
        <div class="block">
          <div class="border-b border-gray-200 px-2">
            <nav class="-mb-px flex space-x-8" aria-label="Tabs">
              <!-- Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" -->
              <nuxt-link
                v-for="table in ['all', 'pro', 'farm']"
                :key="table"
                :to="
                  table === 'all'
                    ? `/${season}/team/${team}/roster`
                    : `/${season}/team/${team}/roster/${table}`
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
                  table === roster
                    ? 'text-primary-200 border-primary-200 font-bold'
                    : 'text-primary-400'
                "
              >
                {{ $t(`rosters.${table}`) }}
              </nuxt-link>
              <div class="flex-grow" />
              <div class="py-2 px-2 text-sm flex flex-row items-center gap-2">
                <div>Positionen:</div>
                <div class="flex flex-row rounded-2xl border-2 border-primary-300 overflow-hidden">
                  <div
                    v-for="position of positions"
                    :key="position"
                    @click="() => togglePosition(position)"
                    :class="
                      selectedPositions.has(position)
                        ? 'dark:bg-primary-400 bg-primary-300'
                        : 'dark:bg-primary-700 bg-primary-50'
                    "
                    class="
                      py-2
                      px-2
                      hover:bg-primary-300
                      w-10
                      text-center
                      font-medium
                      cursor-pointer
                    "
                  >
                    {{ position }}
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
      <team-playerlist
        :team="team"
        :season="season"
        :selectedRoster="roster"
        :positions="selectedPositions"
      />
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
  async asyncData({ params: { season, team, roster } }) {
    return { season, team, roster: roster || 'all' }
  },
  data() {
    return {
      positions: ['G', 'D', 'LW', 'C', 'RW'],
      selectedPositions: new Set(['G', 'D', 'LW', 'C', 'RW']),
      legend: {
        '#': 'Rückennummer',
        POS: 'Position',
        CD: 'Condition / Fitnesszustand',
        IT: 'Intensität',
        SP: 'Speed / Geschwindigkeit',
        ST: 'Strength / Stärke',
        EN: 'Endurance / Ausdauer',
        DU: 'Durability / Strapazierfähigkeit',
        DI: 'Disziplin',
        SK: 'Skating',
        PA: 'Passen',
        PC: 'Puck Control / Puckkontrolle',
        DF: 'Defensive / Abwehrverhalten',
        SC: 'Scoring / Torbaschluss',
        EX: 'Expierence / Erfahrung',
        LD: 'Leading / Führungsqualitäten',
        OV: 'Overall / Gesamtbewertung',
        AGE: 'Alter in Jahren',
        CT: 'Vertragslänge',
        GEHALT: 'Jährliches Gehalt',
        DD: 'Day to day injury / Einsatz fraglich',
        '1W': '1-2 week injury / fällt noch 1 bis 2 Wochen aus',
        '3W': '2-4 week injury / fällt noch 2 bis 4 Wochen aus',
        '1M': '4-6 week injury / fällt noch 4 bis 6 Wochen aus',
        '3M': '2-4 month injury / fällt noch 2 bis 4 Monate aus',
        IN: 'Injured Indefinitely / fällt auf unbestimmte Zeit aus',
        'S#': 'Suspended for # games / für # Spiele gesperrt',
        HO: 'im Trainingscamp'
      }
    }
  },
  methods: {
    togglePosition(position) {
      let selectedPositions
      if (this.selectedPositions.size === 5) {
        selectedPositions = new Set([position])
      } else {
        selectedPositions = new Set(this.selectedPositions)
        if (selectedPositions.has(position)) {
          selectedPositions.delete(position)
        } else {
          selectedPositions.add(position)
        }
      }
      if (selectedPositions.size === 0) {
        selectedPositions = new Set(this.positions)
      }
      this.selectedPositions = selectedPositions
    }
  }
}
</script>

<style></style>
