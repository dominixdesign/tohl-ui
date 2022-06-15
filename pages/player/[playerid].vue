<template>
  <div v-if="loading" key="player-loading">lädt...</div>
  <div v-else-if="error" key="player-error">oops {{ error }}</div>
  <div
    v-else-if="player && player.id"
    key="player-display"
    class="relative pb-5 border-b border-gray-200 sm:pb-0"
  >
    <div class="md:flex md:items-center md:justify-between">
      <div class="flex items-start space-x-5">
        <div class="flex-shrink-0">
          <player-photo :playerid="player.id" :teamid="player.seasondata.team.teamid" />
        </div>
        <div>
          <h1 class="text-2xl font-bold text-gray-900">
            <span class="block sm:inline">{{ player.display_fname }}&nbsp;</span>
            <span class="uppercase font-bold">{{ player.display_lname }}</span>
            <flag
              class="inline-block ml-2 rounded h-5 -translate-y-1 border border-gray-300"
              :code="player.nation"
            />
          </h1>
          <ul class="text-sm font-medium text-gray-500 flex flex-wrap divide-x divide-gray-300">
            <li class="pr-2">{{ player.seasondata.position }}</li>
            <li class="px-2">#{{ player.seasondata.number }}</li>
            <li class="px-2">{{ player.seasondata.team.teamsim }}</li>
            <li class="px-2">{{ player.height }}cm</li>
            <li class="px-2">{{ player.weight }}kg</li>
            <li class="pl-2">
              {{ player.hand === 'R' ? 'Schießt mit rechts' : 'Schießt mit links' }}
            </li>
          </ul>
          <ul class="text-sm font-medium text-gray-500 flex flex-wrap divide-x divide-gray-300">
            <li class="pr-2">{{ player.seasondata.age }} Jahre</li>
            <li class="px-2">${{ player.seasondata.salary }} ({{ player.seasondata.contract }})</li>
            <li class="pl-2">{{ 'draft' }}</li>
          </ul>
          <table
            class="ratings-table hidden sm:table"
            border="0"
            cellspacing="0"
            cellpadding="0"
            align="center"
          >
            <tbody>
              <tr>
                <th rowspan="2" class="ov">Overall</th>
                <td rowspan="2" class="ov">{{ player.seasondata.ov }}</td>
                <th>IT</th>
                <th>SP</th>
                <th>ST</th>
                <th>EN</th>
                <th>DU</th>
                <th>DI</th>
                <th>SK</th>
                <th>PA</th>
                <th>PC</th>
                <th>DF</th>
                <th>SC</th>
                <th>EX</th>
                <th>LD</th>
              </tr>
              <tr>
                <td>{{ player.seasondata.it }}</td>
                <td>{{ player.seasondata.sp }}</td>
                <td>{{ player.seasondata.st }}</td>
                <td>{{ player.seasondata.en }}</td>
                <td>{{ player.seasondata.du }}</td>
                <td>{{ player.seasondata.di }}</td>
                <td>{{ player.seasondata.sk }}</td>
                <td>{{ player.seasondata.pa }}</td>
                <td>{{ player.seasondata.pc }}</td>
                <td>{{ player.seasondata.df }}</td>
                <td>{{ player.seasondata.sc }}</td>
                <td>{{ player.seasondata.ex }}</td>
                <td>{{ player.seasondata.ld }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="block sm:hidden">
        <table
          class="ratings-table tracking-tighter"
          border="0"
          cellspacing="0"
          cellpadding="0"
          align="center"
        >
          <tbody>
            <tr>
              <th rowspan="2" class="ov">Overall</th>
              <td rowspan="2" class="ov">{{ player.seasondata.ov }}</td>
              <th>IT</th>
              <th>SP</th>
              <th>ST</th>
              <th>EN</th>
              <th>DU</th>
              <th>DI</th>
              <th>SK</th>
              <th>PA</th>
              <th>PC</th>
              <th>DF</th>
              <th>SC</th>
              <th>EX</th>
              <th>LD</th>
            </tr>
            <tr>
              <td>{{ player.seasondata.it }}</td>
              <td>{{ player.seasondata.sp }}</td>
              <td>{{ player.seasondata.st }}</td>
              <td>{{ player.seasondata.en }}</td>
              <td>{{ player.seasondata.du }}</td>
              <td>{{ player.seasondata.di }}</td>
              <td>{{ player.seasondata.sk }}</td>
              <td>{{ player.seasondata.pa }}</td>
              <td>{{ player.seasondata.pc }}</td>
              <td>{{ player.seasondata.df }}</td>
              <td>{{ player.seasondata.sc }}</td>
              <td>{{ player.seasondata.ex }}</td>
              <td>{{ player.seasondata.ld }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="mt-3 flex md:mt-0 md:absolute md:top-3 md:right-0">
        <button
          type="button"
          class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tohl-500"
        >
          Vergleichen
        </button>
        <button
          type="button"
          class="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tohl-500"
        >
          OV-Rechner
        </button>
      </div>
    </div>
    <div class="mt-4">
      <div class="sm:hidden">
        <label for="current-tab" class="sr-only">Select a tab</label>
        <select
          id="current-tab"
          name="current-tab"
          class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-tohl-500 focus:border-tohl-500 sm:text-sm rounded-md"
        >
          <option v-for="tab in tabs" :key="tab.name" :selected="tab.current">
            {{ tab.name }}
          </option>
        </select>
      </div>
      <div class="hidden sm:block">
        <nav class="-mb-px flex space-x-8">
          <NuxtLink
            v-for="tab in tabs"
            :key="tab.name"
            :to="
              tab.href === 'career' ? `/player/${player.id}` : `/player/${player.id}/${tab.href}`
            "
            :class="[
              $route.fullPath === `/player/${player.id}/${tab.href}` ||
              ($route.fullPath === `/player/${player.id}` && tab.href === 'career')
                ? 'border-tohl-500 text-tohl-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              'whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm'
            ]"
            :aria-current="tab.current ? 'page' : undefined"
          >
            {{ tab.name }}
          </NuxtLink>
        </nav>
      </div>
    </div>
  </div>
  <div class="pt-3">
    <NuxtPage :key="`player-${$route.fullPath}`" />
  </div>
</template>

<script setup>
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

const route = useRoute()
const { currentRoute } = useRouter()

const { result, loading, error } = useQuery(
  gql`
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
  {
    id: route.params.playerid
  }
)
const player = computed(() => result?.value?.player || {})

const tabs = [
  { name: 'Karriere', href: 'career', current: false },
  { name: 'Spiele', href: 'games', current: false },
  { name: 'Trades', href: 'trades', current: true },
  { name: 'Entwicklung', href: 'development', current: false },
  { name: 'Awards', href: 'awards', current: false }
]
</script>

<style scoped>
.ratings-table {
  @apply border border-gray-200 text-xs mt-2 ml-0;
}
.ratings-table th,
.ratings-table td {
  @apply border-l border-gray-200;
  text-align: center;
  padding: 2px 5px;
}
.ratings-table th {
  @apply bg-gray-300 text-secondary-500;
  vertical-align: middle;
}
.ratings-table th.ov {
  @apply text-white bg-black uppercase;
  font-size: 7px;
  writing-mode: vertical-lr;
  padding: 0 2px;
}
.ratings-table td.ov {
  @apply text-3xl -tracking-[.1em] font-bold pr-2 leading-3;
}
</style>
