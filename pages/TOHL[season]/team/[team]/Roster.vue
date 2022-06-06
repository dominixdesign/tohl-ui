<script setup>
import Datatable from '@/components/Datatable.vue'
import { computed } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

const route = useRoute()
const router = useRouter()

const { result, loading, error } = useQuery(
  gql`
    query getRoster($team: String!, $season: ID!) {
      roster(teamsim: $team, season: $season) {
        id
        fname
        lname
        display_fname
        display_lname
        seasondata(season: $season) {
          roster
          number
          age
          salary
          contract
          pos
          cd
          ij
          it
          sp
          st
          en
          du
          di
          sk
          pa
          pc
          df
          sc
          ex
          ld
          ov
        }
      }
    }
  `,
  {
    season: `TOHL${route.params.season}`,
    team: route.params.team
  }
)
const players = computed(() => result.value.roster || [])

const navigateToPlayer = (playerId) => {
  router.push(`/player/${playerId}`)
}

const columns = [
  {
    title: '#',
    field: 'seasondata.number',
    sorter: 'number',
    hozAlign: 'right',
    cssClass: 'text-secondary-500 font-bold',
    width: 27,
    minWidth: 27,
    resizable: false,
    frozen: true,
    responsive: 2
  },
  {
    title: 'Name',
    field: 'display_lname',
    sorter: 'string',
    minWidth: 100,
    resizable: false,
    frozen: true,
    cssClass: 'text-tohl-500 underline',
    responsive: 0,
    cellClick: function (e, cell) {
      var data = cell.getRow().getData()
      navigateToPlayer(data.id)
    },
    formatter: function (cell) {
      var data = cell.getRow().getData()
      return `${data.display_fname} <b>${data.display_lname}</b>`
    }
  },
  {
    title: 'Pos',
    field: 'seasondata.pos',
    sorter: 'string',
    width: 27,
    minWidth: 27,
    resizable: false
  },
  {
    title: 'CD',
    field: 'seasondata.cd',
    sorter: 'number',
    hozAlign: 'right',
    width: 27,
    minWidth: 27,
    resizable: false,
    responsive: 0
  },
  {
    title: 'IT',
    field: 'seasondata.it',
    sorter: 'number',
    hozAlign: 'right',
    width: 27,
    minWidth: 27,
    resizable: false,
    responsive: 0
  },
  {
    title: 'SP',
    field: 'seasondata.sp',
    sorter: 'number',
    hozAlign: 'right',
    width: 27,
    minWidth: 27,
    resizable: false,
    responsive: 0
  },
  {
    title: 'ST',
    field: 'seasondata.st',
    sorter: 'number',
    hozAlign: 'right',
    width: 27,
    minWidth: 27,
    resizable: false,
    responsive: 0
  },
  {
    title: 'EN',
    field: 'seasondata.en',
    sorter: 'number',
    hozAlign: 'right',
    width: 27,
    minWidth: 27,
    resizable: false,
    responsive: 0
  },
  {
    title: 'DU',
    field: 'seasondata.du',
    sorter: 'number',
    hozAlign: 'right',
    width: 27,
    minWidth: 27,
    resizable: false,
    responsive: 0
  },
  {
    title: 'DI',
    field: 'seasondata.di',
    sorter: 'number',
    hozAlign: 'right',
    width: 27,
    minWidth: 27,
    resizable: false,
    responsive: 0
  },
  {
    title: 'SK',
    field: 'seasondata.sk',
    sorter: 'number',
    hozAlign: 'right',
    width: 27,
    minWidth: 27,
    resizable: false,
    responsive: 0
  },
  {
    title: 'PA',
    field: 'seasondata.pa',
    sorter: 'number',
    hozAlign: 'right',
    width: 27,
    minWidth: 27,
    resizable: false,
    responsive: 0
  },
  {
    title: 'PC',
    field: 'seasondata.pc',
    sorter: 'number',
    hozAlign: 'right',
    width: 27,
    minWidth: 27,
    resizable: false,
    responsive: 0
  },
  {
    title: 'DF',
    field: 'seasondata.df',
    sorter: 'number',
    hozAlign: 'right',
    width: 27,
    minWidth: 27,
    resizable: false,
    responsive: 0
  },
  {
    title: 'SC',
    field: 'seasondata.sc',
    sorter: 'number',
    hozAlign: 'right',
    width: 27,
    minWidth: 27,
    resizable: false,
    responsive: 0
  },
  {
    title: 'EX',
    field: 'seasondata.ex',
    sorter: 'number',
    hozAlign: 'right',
    width: 27,
    minWidth: 27,
    resizable: false,
    responsive: 0
  },
  {
    title: 'LD',
    field: 'seasondata.ld',
    sorter: 'number',
    hozAlign: 'right',
    width: 27,
    minWidth: 27,
    resizable: false,
    responsive: 0
  },
  {
    title: 'OV',
    field: 'seasondata.ov',
    sorter: 'number',
    hozAlign: 'right',
    width: 27,
    minWidth: 27,
    resizable: false,
    responsive: 0
  },
  {
    title: 'Age',
    field: 'seasondata.age',
    sorter: 'number',
    hozAlign: 'right',
    width: 37,
    minWidth: 37,
    resizable: false,
    responsive: 0
  },
  {
    title: 'CT',
    field: 'seasondata.contract',
    sorter: 'number',
    hozAlign: 'right',
    width: 27,
    minWidth: 27,
    resizable: false,
    responsive: 0
  },
  {
    title: 'Salary',
    field: 'seasondata.salary',
    sorter: 'number',
    hozAlign: 'right',
    resizable: false,
    responsive: 0,
    width: 100,
    sorterParams: {
      thousandSeparator: '.',
      decimalSeparator: ','
    },
    formatter: 'money',
    formatterParams: {
      decimal: ',',
      thousand: '.',
      symbol: '$',
      precision: false
    }
  }
]
</script>
<template>
  <div class="mt-3">
    <div v-if="loading">laden...</div>
    <div v-else-if="error">oops {{ error }}</div>
    <div v-else>
      <Datatable :tabledata="players" :columns="columns" />
    </div>
    <span class="text-secondary-500 font-bold"></span>
    <span class="text-tohl-500 font-bold underline"></span>
  </div>
</template>
