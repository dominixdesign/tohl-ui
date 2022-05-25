<script setup>
import Datatable from '@/components/Datatable.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

const route = useRoute()

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
    season: route.params.season,
    team: route.params.team
  }
)
const players = computed(() => result.value.roster || [])
</script>
<template>
  <div>
    <h1>Roster</h1>
    <div v-if="loading">laden...</div>
    <div v-else-if="error">oops {{ error }}</div>
    <div v-else>
      <Datatable
        :tabledata="players"
        :columns="[
          { title: '#', field: 'seasondata.number', sorter: 'number' },
          { title: 'Name', field: 'display_lastname', sorter: 'string' },
          { title: 'Pos', field: 'seasondata.pos', sorter: 'string' },
          { title: 'CD', field: 'seasondata.cd', sorter: 'number' },
          { title: 'IT', field: 'seasondata.it', sorter: 'number' },
          { title: 'SP', field: 'seasondata.sp', sorter: 'number' },
          { title: 'ST', field: 'seasondata.st', sorter: 'number' },
          { title: 'EN', field: 'seasondata.en', sorter: 'number' },
          { title: 'DU', field: 'seasondata.du', sorter: 'number' },
          { title: 'DI', field: 'seasondata.di', sorter: 'number' },
          { title: 'SK', field: 'seasondata.sk', sorter: 'number' },
          { title: 'PA', field: 'seasondata.pa', sorter: 'number' },
          { title: 'PC', field: 'seasondata.pc', sorter: 'number' },
          { title: 'DF', field: 'seasondata.df', sorter: 'number' },
          { title: 'SC', field: 'seasondata.sc', sorter: 'number' },
          { title: 'EX', field: 'seasondata.ex', sorter: 'number' },
          { title: 'LD', field: 'seasondata.ld', sorter: 'number' },
          { title: 'OV', field: 'seasondata.ov', sorter: 'number' },
          { title: 'Age', field: 'seasondata.age', sorter: 'number' },
          { title: 'CT', field: 'seasondata.contract', sorter: 'number' },
          { title: '$', field: 'seasondata.salary', sorter: 'currency' }
        ]"
      />
    </div>
  </div>
</template>
