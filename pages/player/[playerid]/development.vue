<template>
  <section>
    <div v-if="loading" key="player-career-loading">lädt...</div>
    <div v-else-if="error" key="player-career-error">oops {{ error }}</div>
    <div v-else-if="development">
      <h3 class="font-bold text-xl ml-1 sm:ml-0 mb-2">
        Entwicklung von {{ development.display_fname }} {{ development.display_lname }}
      </h3>
      <div class="max-w-3xl mx-auto">
        <player-development :chartdata="chartdata" :options="options" :width="300" :height="300" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import colors from '~/tailwind.colors.json'

const route = useRoute()

const chartdata = ref({})
const development = ref(false)
const options = {
  maintainAspectRatio: false,
  scales: {
    x: {
      stacked: true
    },
    y: {
      stacked: true
    }
  }
}

const { result, loading, error } = useQuery(
  gql`
    query development($id: ID!) {
      player(id: $id) {
        id
        display_fname
        display_lname
        data {
          season
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
  { id: route.params.playerid }
)

watch(
  result,
  (newResult) => {
    if (Object.keys(newResult?.player || {}).length === 0) {
      return
    }
    development.value = newResult?.player
    const devData = newResult?.player
    let color = 0
    const datasets = devData.data
      .filter((s) => s.season.indexOf('PLF') === -1 && s.season.indexOf('pre') === -1)
      .map((s, index, sets) => {
        color = color <= 900 ? color + 100 : 0
        const schema = index % 2 === 0 ? 'primary' : 'secondary'
        if (index === 0) {
          return {
            label: s.season,
            borderColor: 'rgba(0,0,0,0.5)',
            backgroundColor: colors[schema][color],
            borderWidth: 1,
            data: [
              s.it,
              s.sp,
              s.st,
              s.en,
              s.du,
              s.di,
              s.sk,
              s.pa,
              s.pc,
              s.df,
              s.sc,
              s.ex,
              s.ld,
              s.ov
            ]
          }
        } else {
          const prev = sets[index - 1]
          return {
            label: s.season,
            borderColor: 'rgba(0,0,0,0.5)',
            backgroundColor: colors[schema][color],
            borderWidth: 1,
            data: [
              s.it - prev.it,
              s.sp - prev.sp,
              s.st - prev.st,
              s.en - prev.en,
              s.du - prev.du,
              s.di - prev.di,
              s.sk - prev.sk,
              s.pa - prev.pa,
              s.pc - prev.pc,
              s.df - prev.df,
              s.sc - prev.sc,
              s.ex - prev.ex,
              s.ld - prev.ld,
              s.ov - prev.ov
            ]
          }
        }
      })
    chartdata.value = {
      labels: ['IT', 'SP', 'ST', 'EN', 'DU', 'DI', 'SK', 'PA', 'PC', 'DF', 'SC', 'EX', 'LD', 'OV'],
      datasets
    }
  },
  { immediate: true, deep: true }
)
</script>
