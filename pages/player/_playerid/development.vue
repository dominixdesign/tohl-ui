<template>
  <div v-if="development">
    <h3>Player Development</h3>
    <player-development :chartdata="chartdata" :options="options" />
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  async asyncData({ params: { playerid } }) {
    return { playerid }
  },
  data() {
    return {
      options: {
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
        const datasets = devData
          .filter((s) => s.season.indexOf('PLF') === -1 && s.season.indexOf('pre') === -1)
          .map((s, index, sets) => {
            if (index === 0) {
              return {
                label: s.season,
                borderColor: 'rgba(0,0,0,0.5)',
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
      update: ({ player }) => player.data,
      error() {
        this.error = true
      }
    }
  }
}
</script>
