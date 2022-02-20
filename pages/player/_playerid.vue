<template>
  <div v-if="player">
    <div class="relative isolate overflow-hidden shadow">
      <team-bg
        :foreground="player.seasondata.team.foreground"
        :background="player.seasondata.team.background"
      />
      <div class="container mx-auto flex flex-col p-6 sm:flex-row">
        <div class="w-full sm:w-40">
          <div
            class="mx-auto h-40 w-40 rounded-full bg-cover bg-top shadow"
            :style="`background-image: url(https://my-tohl.org/img/player/${player.id}.jpg)`"
          />
        </div>
        <div class="flex grow flex-col place-items-center gap-1 sm:place-items-start sm:pl-4">
          <h2
            class="
              inline-block
              bg-gray-50 bg-opacity-40
              px-2
              text-center
              font-sans
              text-3xl
              font-extrabold
              uppercase
              sm:text-left
            "
          >
            {{ player.display_fname }} {{ player.display_lname }}
          </h2>
          <p class="inline-block bg-gray-50 bg-opacity-40 px-2">
            {{ player.seasondata.position }} | #{{ player.seasondata.number }} |
            {{ player.seasondata.team.teamsim }}
          </p>
          <p class="inline-block bg-gray-50 bg-opacity-40 px-2">
            {{ player.height }}cm | {{ player.weight }}kg |
            {{ player.hand === 'R' ? 'Schießt mit rechts' : 'Schießt mit links' }}
          </p>
          <p class="inline-block bg-gray-50 bg-opacity-40 px-2">
            <span>{{ player.seasondata.age }} Jahre alt |</span>
            <country-flag
              :country="player.nation"
              size="normal"
              style="margin-bottom: -14px; margin-left: -12px"
            />
          </p>
          <p class="inline-block bg-gray-50 bg-opacity-40 px-2">
            Gehalt: ${{ player.seasondata.salary }} ({{ player.seasondata.contract }} Jahr(e))
          </p>
        </div>
        <div class="hidden w-40 md:block">
          <team-logo-big :teamid="player.seasondata.team.teamid" />
        </div>
      </div>
    </div>
    <div class="skilltable overflow-y-auto border-b border-secondary-500 py-4 px-3">
      <table class="mx-auto border-collapse text-primary-900 dark:text-white">
        <tbody>
          <tr>
            <td class="hidden text-5xl font-bold sm:table-cell" rowspan="2">
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
    <div class="w-full">
      <div class="bg-gray-100 dark:bg-primary-800 xl:shadow">
        <div class="block">
          <div class="border-b border-gray-200 px-2">
            <nav class="container mx-auto -mb-px flex space-x-8 overflow-x-auto" aria-label="Tabs">
              <nuxt-link
                v-for="subpage in ['career', 'gamelog', 'trades', 'development', 'awards']"
                :key="subpage"
                :to="
                  subpage === 'career' ? `/player/${playerid}/` : `/player/${playerid}/${subpage}`
                "
                class="
                  whitespace-nowrap
                  border-b-2 border-transparent
                  py-4
                  px-1
                  text-sm
                  font-medium
                  hover:border-primary-200 hover:text-primary-200
                "
                :class="
                  fullPath === `/player/${playerid}/${subpage}` ||
                  (fullPath === `/player/${playerid}/` && subpage === 'career')
                    ? 'border-primary-200 font-bold text-primary-200'
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
    <div class="p-4">
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
  async asyncData({ params: { playerid }, route: { fullPath } }) {
    return { playerid, fullPath }
  },
  components: {
    CountryFlag
  },
  watch: {
    $route({ fullPath }) {
      this.fullPath = fullPath
    }
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
        query player($id: ID!) {
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
            seasondata {
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

<style lang="postcss" scoped>
.skilltable td,
.skilltable th {
  @apply font-mono;
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
