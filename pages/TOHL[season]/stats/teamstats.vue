<template>
  <div class="p-6 xl:px-12 mx-auto max-w-screen-2xl">
    <layout-headline :showSeasonSelect="true">Team Statistik</layout-headline>
    <Datatable :tabledata="teamstats" :columns="columns" />
    <div class="bg-gray-100 xl:shadow p-6 mt-6" v-if="!$apollo.loading">
      <h3 class="font-serif font-extralight uppercase pb-4 text-xl">Legende</h3>
      <div class="grid grid-cols-3 gap-4">
        <div v-for="(dd, dt) in legend" :key="dt">
          <span class="font-medium">{{ dt }}</span> <span>&ndash; {{ dd }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { useUserStore } from '~/stores/user'

const { $t } = useNuxtApp()

const userStore = useUserStore()

const route = useRoute()

const legend = {
  'PP%': 'Powerplay Percentage / Überzahlquote',
  'PK%': 'Penaltykilling Percentage / Unterzahlquote',
  'PIM/G': 'Penaltyminutes per Game / Strafminuten pro Spiel',
  'GF/G': 'Goals For per Game / Tor pro Spiel',
  'GA/G': 'Goals Against per Game / Gegentor pro Spiel',
  'SF/G': 'Shots For per Game / Schüsse pro Spiel',
  'SA/G': 'Shots Against per Game / Gegnerische Torschüsse pro Spiel',
  'SH%': 'Shots Percentage / Schussquote',
  'SV%': 'Save Percentage / Fangquote'
}
const logTeam = userStore.getTeam

const { result, loading, error } = useQuery(
  gql`
    query standings($filter: TeamstatsFilter!, $order: [OrderBy]) {
      teamstats(filter: $filter, orderBy: $order) {
        team {
          teamsim
          teamid
          foreground @client(always: true)
          background @client(always: true)
        }
        games
        goalsfor
        goalsagainst
        pp
        ppg
        pk
        pkg
        pim
        shotsfor
        shotsagainst
      }
    }
  `,
  {
    filter: { season: `TOHL${route.params.season}` },
    order: { column: 'games', order: 'DESC' }
  }
)
const teamstats = computed(() => {
  return (
    result?.value?.teamstats.map((t) => {
      return {
        ...t,
        ppcalc: Number((t.ppg / t.pp) * 100).toFixed(2),
        pkcalc: Number((1 - t.pkg / t.pk) * 100).toFixed(2),
        pimg: Number(t.pim / t.games).toFixed(2),
        gcalc: Number((t.goalsfor / t.shotsfor) * 100).toFixed(2),
        scalc: Number((1 - t.goalsagainst / t.shotsagainst) * 100).toFixed(2),
        gfg: Number(t.goalsfor / t.games).toFixed(2),
        gag: Number(t.goalsagainst / t.games).toFixed(2),
        sfg: Number(t.shotsfor / t.games).toFixed(2),
        sag: Number(t.shotsagainst / t.games).toFixed(2)
      }
    }) || []
  )
})

console.log($t)
const columns = [
  {
    title: $t('column.teamname'),
    field: 'team.teamsim',
    cssClass: 'text-primary-500 font-bold',
    resizable: false,
    frozen: true
  },
  {
    title: $t('column.games'),
    field: 'games',
    sorter: 'number',
    hozAlign: 'right',
    resizable: false
  },
  {
    title: $t('column.ppcalc'),
    field: 'ppcalc',
    sorter: 'number',
    hozAlign: 'right',
    resizable: false,
    formatter: function (cell) {
      var data = cell.getRow().getData()
      return `${data.ppcalc}%`
    }
  },
  {
    title: $t('column.pkcalc'),
    field: 'pkcalc',
    sorter: 'number',
    hozAlign: 'right',
    resizable: false,
    formatter: function (cell) {
      var data = cell.getRow().getData()
      return `${data.pkcalc}%`
    }
  },
  {
    title: $t('column.pimg'),
    field: 'pimg',
    sorter: 'number',
    hozAlign: 'right',
    resizable: false
  },
  {
    title: $t('column.gfg'),
    field: 'gfg',
    sorter: 'number',
    hozAlign: 'right',
    resizable: false
  },
  {
    title: $t('column.gag'),
    field: 'gag',
    sorter: 'number',
    hozAlign: 'right',
    resizable: false
  },
  {
    title: $t('column.sfg'),
    field: 'sfg',
    sorter: 'number',
    hozAlign: 'right',
    resizable: false
  },
  {
    title: $t('column.sag'),
    field: 'sag',
    sorter: 'number',
    hozAlign: 'right',
    resizable: false
  },
  {
    title: $t('column.gcalc'),
    field: 'gcalc',
    sorter: 'number',
    hozAlign: 'right',
    resizable: false
  },
  {
    title: $t('column.scalc'),
    field: 'scalc',
    sorter: 'number',
    hozAlign: 'right',
    resizable: false
  }
]
</script>
