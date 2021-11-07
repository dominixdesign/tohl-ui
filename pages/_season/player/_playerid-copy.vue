<template>
  <div
    v-if="player"
    class="p-6 xl:px-12 mx-auto max-w-screen-2xl flex flex-col lg:flex-row lg:gap-10"
  >
    <aside class="py-6 h-52 lg:w-52">
      <div
        class="
          rounded-lg
          overflow-hidden
          shadow-lg
          bg-white
          flex flex-row
          lg:flex-col
          items-center
          lg:items-stretch
        "
      >
        <div
          class="hidden lg:block"
          style="clip-path: polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 3rem))"
        >
          <img
            class="w-full"
            :src="`https://my-tohl.org/img/player/${player.id}.jpg`"
            alt="Profile image"
          />
        </div>
        <div class="block lg:hidden">
          <img
            class="w-full"
            :src="`https://my-tohl.org/img/player/${player.id}.jpg`"
            alt="Profile image"
          />
        </div>
        <div class="relative hidden lg:flex justify-between items-center flex-row px-6 z-50 -mt-10">
          <p class="flex items-center text-gray-400 font-bold">
            <player-status :cd="parseInt(player.seasondata.cd)" :ij="player.seasondata.ij" />
          </p>
          <div
            class="
              py-4
              w-16
              h-16
              leading-7
              text-6xl text-center
              font-black
              rounded-full
              font-headline
              overflow-hidden
            "
            :style="`background-color: ${player.seasondata.team.background}; color: ${player.seasondata.team.foreground};`"
          >
            {{ player.seasondata.number }}
          </div>
        </div>
        <div class="pt-6 pb-8 px-3 lg:px-0 text-gray-600 text-center">
          <div class="text-black tracking-wide">
            <span class="text-4xl font-beautiful">
              {{ player.display_fname.replace(' ', '&nbsp;') }}
            </span>
            <div
              class="overflow-hidden uppercase text-bold"
              :class="player.display_lname.length > 10 ? 'text-lg' : 'text-2xl'"
            >
              {{ player.display_lname.replace(' ', '&nbsp;') }}
            </div>
          </div>
          <p class="text-gray-400 text-sm">{{ player.seasondata.position }}</p>
        </div>

        <div class="pb-10 text-center tracking-wide hidden sm:flex justify-around">
          <div class="posts">
            <p class="text-gray-400 text-sm">Größe</p>
            <p class="text-lg font-semibold text-primary-300">{{ player.height }}cm</p>
          </div>
          <div class="followers">
            <p class="text-gray-400 text-sm">Gewicht</p>
            <p class="text-lg font-semibold text-primary-300">{{ player.weight }}kg</p>
          </div>
        </div>
      </div>
    </aside>
    <section class="py-6">
      <div class="rounded-lg overflow-hidden shadow-lg bg-white">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, vitae modi, cum
        perspiciatis quisquam quasi nihil temporibus incidunt earum nulla fugit ipsa omnis at ut
        itaque? Odit necessitatibus aliquid reiciendis.
      </div>
    </section>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  async asyncData({ params: { season, playerid } }) {
    console.log({ season, playerid })
    return { season, playerid }
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
            lname
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

<style></style>
