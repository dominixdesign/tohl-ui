<template>
  <section class="mx-auto max-w-screen-2xl p-6 xl:px-12">
    <div>Hello Contracts</div>  
  </section>
</template>

<script>
import gql from 'graphql-tag'
import { mapGetters } from 'vuex'

export default {
  middleware: ['isAuth'],
  computed: {
    ...mapGetters({
      team:  'user/team',
      season:  'navigation/latestSeason'
    })
  },
  apollo: {
    roster: {
      query: gql`
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
      variables() {
        return {
          team: this.team,
          season: this.season
        }
      },
      update: ({ roster }) => roster,
      error() {
        this.error = true
      }
    }
  },
}
</script>