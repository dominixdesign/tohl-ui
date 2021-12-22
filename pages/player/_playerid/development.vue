<template>
  <div v-if="development">
    <h3 class="font-college font-bold text-xl ml-1 sm:ml-0 mb-2">
      Entwicklung von {{ development.display_fname }} {{ development.display_lname }}
    </h3>
    <div class="max-w-3xl mx-auto">
      <player-development :chartdata="chartdata" :options="options" :width="300" :height="300" />
    </div>
  </div>
</template>

<script>
import { theme } from '~/tailwind.config.js'
import gql from 'graphql-tag'

export default {
  async asyncData({ params: { playerid } }) {
    return { playerid }
  },
  data() {
    return {
      options: {
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              stacked: true
            }
          ],
          yAxes: [
            {
              stacked: true
            }
          ]
        }
      },
      chartdata: {}
    }
  },
  watch: {
    development: {
      immediate: false,
      handler(devData) {
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
                backgroundColor: theme.extend.colors[schema][color],
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
                backgroundColor: theme.extend.colors[schema][color],
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
        this.chartdata = {
          labels: [
            'IT',
            'SP',
            'ST',
            'EN',
            'DU',
            'DI',
            'SK',
            'PA',
            'PC',
            'DF',
            'SC',
            'EX',
            'LD',
            'OV'
          ],
          datasets
        }
      }
    }
  },
  apollo: {
    development: {
      query: gql`
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
      variables() {
        return {
          id: this.playerid
        }
      },
      update: ({ player }) => player,
      error() {
        this.error = true
      }
    }
  }
}
</script>
