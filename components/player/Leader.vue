<template>
  <div class="flex flex-col items-end w-full" v-if="leader && leader.team">
    <div
      class="group bg-gray-100 p-4 rounded-sm player-box w-full"
      :style="`--teamBackground: ${leader.team.background}; --teamForeground: ${leader.team.foreground};`"
    >
      <div class="mx-auto p-2 flex flex-row">
        <player-photo :playerid="leader.player.id" :teamid="leader.team.teamid" />
        <div class="grow sm:pl-3 flex flex-col pt-2 sm:place-items-start place-items-center gap-1">
          <nuxt-link
            :to="`/player/${leader.player.id}`"
            class="font-bold inline-block px-2 bg-gray-50 bg-opacity-40 text-ellipsis overflow-hidden text-gray-500 whitespace-nowrap"
          >
            <span class="block sm:inline tracking-tighter">{{
              leader.player.display_lname.length + leader.player.display_fname.length > 18
                ? leader.player.display_fname[0] + '.'
                : leader.player.display_fname
            }}</span>
            <span class="uppercase text-lg tracking-tighter"
              >&nbsp;{{ leader.player.display_lname }}</span
            >
          </nuxt-link>
          <p
            class="uppercase text-lg tracking-tight font-extrabold inline-block px-2 bg-gray-50 bg-opacity-40"
          >
            {{ $t(`leader.${sortby}`, { count: leader[sortby] }) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { toRefs } from 'vue'

const props = defineProps({
  sortby: String,
  season: String,
  position: String
})
const { sortby, season, position } = toRefs(props)

const where = computed(() => {
  if (position.value === 'offense') {
    return [
      ['playerstats.season', '=', season.value],
      ['playerdata.pos', 'IN', ['LW', 'RW', 'C']]
    ]
  } else if (position.value === 'defense') {
    return [
      ['playerstats.season', '=', season.value],
      ['playerdata.pos', '=', 'D']
    ]
  } else if (position.value === 'goalies') {
    return [
      ['playerstats.season', '=', season.value],
      [
        'playerstats.minutes',
        '>=',
        `(SELECT STD(\`minutes\`) as 'minmin' FROM playerstats WHERE season = '${season.value}')`
      ],
      ['playerdata.pos', '=', 'G']
    ]
  }
})

const { result, loading, error } = useQuery(
  gql`
    query leader($order: [OrderBy], $where: JSON) {
      playerstats(orderBy: $order, limit: 1, where: $where) {
        team {
          teamsim
          teamid
          foreground @client(always: true)
          background @client(always: true)
        }
        player {
          id
          fname
          display_fname
          display_lname
          lname
        }
        season
        games
        icetime
        goals
        assists
        points
        pim
        plusminus
        hits
        shots
        gaa
        savepercentage
        shutout
      }
    }
  `,
  {
    order: { column: sortby.value, order: sortby.value === 'gaa' ? 'ASC' : 'DESC' },
    where: JSON.stringify(where.value)
  }
)

const leader = computed(() => {
  if (result?.value?.playerstats.length === 1) {
    return result?.value?.playerstats[0]
  }
  return false
})
</script>

<style scoped>
.player-box:hover {
  background-color: var(--teamBackground);
  color: var(--teamForeground);
}
.player-box:hover ul {
  color: var(--teamForeground);
}
</style>
