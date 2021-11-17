<template>
  <div v-if="player">
    <div class="dark:bg-primary-700 bg-gray-200 shadow">
      <div class="container mx-auto p-6 flex flex-col sm:flex-row">
        <div class="w-full sm:w-40">
          <div
            class="w-40 h-40 mx-auto rounded-full shadow bg-top bg-cover"
            :style="`background-image: url(https://my-tohl.org/img/player/${player.id}.jpg)`"
          />
        </div>
        <div class="flex-grow sm:pl-4">
          <h2 class="uppercase text-3xl font-bold font-college text-center sm:text-left">
            {{ player.display_fname }} {{ player.display_lname }}
          </h2>
          <p class="text-center sm:text-left">
            {{ player.seasondata.position }} | #{{ player.seasondata.number }} |
            {{ player.seasondata.team.teamsim }}
          </p>
          <p class="text-center sm:text-left">
            {{ player.height }}cm | {{ player.weight }}kg |
            {{ player.hand === 'R' ? 'Schießt mit rechts' : 'Schießt mit links' }}
          </p>
          <p class="text-center sm:text-left">
            <span>{{ player.seasondata.age }} Jahre alt |</span>
            <country-flag
              :country="player.nation"
              size="normal"
              style="margin-bottom: -14px; margin-left: -12px"
            />
          </p>
          <p class="text-center sm:text-left">
            Gehalt: ${{ player.seasondata.salary }} ({{ player.seasondata.contract }} Jahr(e))
          </p>
        </div>
        <div class="w-40 hidden md:block">
          <team-logo-big :teamid="player.seasondata.team.teamid" />
        </div>
      </div>
    </div>
    <div class="skilltable border-b border-secondary-500 py-4 overflow-y-auto px-3">
      <table class="mx-auto border-collapse text-primary-900 dark:text-white">
        <tbody>
          <tr>
            <td class="text-5xl font-bold hidden sm:table-cell" rowspan="2">
              {{ player.seasondata.ov }}
            </td>
            <th v-for="skill in skills" :key="skill" class="uppercase">
              {{ skill }}
            </th>
          </tr>
          <tr>
            <td v-for="skill in skills" :key="skill" class="uppercase">
              {{ player.seasondata[skill] > 0 ? player.seasondata[skill] : '&mdash;' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <div class="bg-gray-100 dark:bg-primary-800 xl:shadow">
        <div class="block">
          <div class="border-b border-gray-200 px-2">
            <nav class="container mx-auto -mb-px flex space-x-8" aria-label="Tabs">
              <nuxt-link
                v-for="subpage in ['career', 'farm', 'gamelog', 'trades', 'development', 'awards']"
                :key="subpage"
                :to="
                  subpage === 'career'
                    ? `/${season}/player/${playerid}/`
                    : `/${season}/player/${playerid}/${subpage}`
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
                  subpage === partition
                    ? 'text-primary-200 border-primary-200 font-bold'
                    : 'text-primary-400'
                "
              >
                {{ $t(`playersubs.${subpage}`) }}
              </nuxt-link>
            </nav>
          </div>
        </div>
      </div>
    </div>
    <div class="container mx-auto pt-4">
      <nuxt-child />
    </div>
  </div>
</template>

<script>
import CountryFlag from 'vue-country-flag'

import vue from 'vue'
import gql from 'graphql-tag'
import { mapState } from 'vuex'

export default {
  async asyncData({ params: { season, playerid, partition } }) {
    return { season, playerid, partition }
  },
  components: {
    CountryFlag
  },
  computed: {
    ...mapState({
      colormode: (state) => state.layout.colormode
    }),
    skills() {
      return ['it', 'sp', 'st', 'en', 'du', 'di', 'sk', 'pa', 'pc', 'df', 'sc', 'ex', 'ld']
    },
    graphOptions() {
      return {
        legend: {
          display: false
        },
        scale: {
          ticks: {
            min: 0,
            max: 100,
            fontColor: this.colormode === 'dark' ? 'white' : 'black',
            showLabelBackdrop: false
          },
          pointLabels: {
            fontColor: this.colormode === 'dark' ? 'white' : 'black'
          },
          gridLines: {
            color: this.colormode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'
          },
          angleLines: {
            color: this.colormode === 'dark' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)'
          }
        }
      }
    }
  },
  apollo: {
    player: {
      query: gql`
        query player($id: ID!, $season: ID) {
          player(id: $id) {
            id
            fname
            display_fname
            display_lname
            height
            weight
            hand
            lname
            nation
            seasondata(season: $season) {
              team {
                teamsim
                teamid
                foreground @client(always: true)
                background @client(always: true)
              }
              roster
              number
              age
              salary
              contract
              pos
              position @client(always: true)
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
      variables() {
        return {
          id: this.playerid,
          season: this.season
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

<style lang="postcss" scoped>
.skilltable td,
.skilltable th {
  @apply font-headline;
  @apply py-2;
  @apply px-1;
  @apply border;
  @apply border-primary-600;
}
@media (min-width: 640px) {
  .skilltable td,
  .skilltable th {
    @apply px-3;
  }
}
.skilltable th {
  @apply bg-primary-600;
  @apply text-white;
}
.skilltable td {
  @apply py-1;
}
.skilltable td:hover {
  @apply bg-gray-600;
}
</style>
