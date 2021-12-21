<template>
  <div class="py-2 sm:p-6 xl:px-12 mx-auto max-w-screen-2xl" v-if="injuries">
    <div class="xl:shadow mt-4" v-for="team of teams" :key="`injuries-${team.teamsim}`">
      <div
        class="
          p-3
          text-lg
          font-bold
          bg-primary-500
          dark:bg-primary-700
          text-primary-50
          dark:text-primary-200
          uppercase
        "
      >
        <team-logo-inline :teamid="team.teamid" /> {{ team.teamsim }}
      </div>
      <table class="table-fixed w-full" v-if="injuries[team.teamid]">
        <tbody>
          <tr
            v-for="(injured, index) of injuries[team.teamid]"
            :key="`${team.teamid}-${injured.player.lname}-${injured.player.fname}`"
            :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'"
          >
            <td class="p-2 w-3/12"><player-linked-name :player="injured.player" /></td>
            <td class="p-2 w-1/12">{{ injured.position }}</td>
            <td class="p-2 w-8/12" v-if="injured.cd > 0">
              {{ injured.ij }} (CD: {{ injured.cd }} )
            </td>
            <td class="p-2 w-8/12" v-if="injured.ij.indexOf('S') >= 0">
              noch für {{ $tc('sperre', parseInt(injured.ij.replace('S', ''))) }} gesperrt.
            </td>
          </tr>
        </tbody>
      </table>
      <p class="p-4" v-else>Alle Spieler verfügbar.</p>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  async asyncData({ params, i18n }) {
    const season = params.season
    return { season }
  },
  apollo: {
    teams: {
      query: gql`
        query getTeams($season: String!) {
          teams(filter: { season: $season }) {
            teamid
            teamsim
            season
          }
        }
      `,
      variables() {
        return {
          season: this.season
        }
      },
      update: ({ teams }) => teams,
      error() {
        this.error = true
      }
    },
    injuries: {
      query: gql`
        query getInjuredPlayers($season: ID!, $where: JSON) {
          findByData(season: $season, where: $where) {
            player {
              id
              display_fname
              display_lname
              fname
              lname
            }
            team {
              teamid
            }
            pos
            position @client(always: true)
            cd
            ij
          }
        }
      `,
      variables() {
        return {
          season: this.season,
          where: JSON.stringify([['ij', '!=', '']])
        }
      },
      update: ({ findByData }) => {
        const injuries = {}
        for (const inj of findByData) {
          console.log(inj)
          if (!injuries[inj.team.teamid]) {
            injuries[inj.team.teamid] = []
          }
          injuries[inj.team.teamid] = [...injuries[inj.team.teamid], inj]
        }
        console.log(injuries)
        return injuries
      },
      error() {
        this.error = true
      }
    }
  }
}
</script>
