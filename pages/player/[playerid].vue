<template>
  <div class="relative pb-5 border-b border-gray-200 sm:pb-0">
    <div v-if="loading">lädt...</div>
    <div v-else-if="error">oops {{ error }}</div>
    <div v-else class="md:flex md:items-center md:justify-between">
      <div class="flex items-start space-x-5">
        <div class="flex-shrink-0">
          <div class="relative">
            <img
              class="h-20 w-20 rounded-full object-contain"
              :src="`https://my-tohl.org/img/player/${player.id}.jpg`"
              alt=""
            />
            <span class="absolute inset-0 shadow-inner rounded-full" aria-hidden="true" />
          </div>
        </div>
        <!--
        Use vertical padding to simulate center alignment when both lines of text are one line,
        but preserve the same layout if the text wraps without making the image jump around.
      -->
        <div class="pt-1.5">
          <h1 class="text-2xl font-bold text-gray-900">
            <span>{{ player.display_fname }} {{ player.display_lname }}</span>
            <flag class="inline-block ml-2 rounded h-5 -translate-y-0.5" :code="player.nation" />
          </h1>
          <ul class="text-sm font-medium text-gray-500 inline-flex divide-x divide-gray-300">
            <li class="pr-2">{{ player.seasondata.position }}</li>
            <li class="px-2">#{{ player.seasondata.number }}</li>
            <li class="px-2">{{ player.seasondata.team.teamsim }}</li>
            <li class="px-2">{{ player.height }}cm</li>
            <li class="px-2">{{ player.weight }}kg</li>
            <li class="pl-2">
              {{ player.hand === 'R' ? 'Schießt mit rechts' : 'Schießt mit links' }}
            </li>
          </ul>
        </div>
      </div>
      <div class="mt-3 flex md:mt-0 md:absolute md:top-3 md:right-0">
        <button
          type="button"
          class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Share
        </button>
        <button
          type="button"
          class="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create
        </button>
      </div>
    </div>
    <div class="mt-4">
      <div class="sm:hidden">
        <label for="current-tab" class="sr-only">Select a tab</label>
        <select
          id="current-tab"
          name="current-tab"
          class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option v-for="tab in tabs" :key="tab.name" :selected="tab.current">
            {{ tab.name }}
          </option>
        </select>
      </div>
      <div class="hidden sm:block">
        <nav class="-mb-px flex space-x-8">
          <a
            v-for="tab in tabs"
            :key="tab.name"
            :href="tab.href"
            :class="[
              tab.current
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              'whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm'
            ]"
            :aria-current="tab.current ? 'page' : undefined"
          >
            {{ tab.name }}
          </a>
        </nav>
      </div>
    </div>
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
const player = computed(() => result.value.player || {})

const tabs = [
  { name: 'Karriere', href: '#', current: false },
  { name: 'Spiele', href: '#', current: false },
  { name: 'Trades', href: '#', current: true },
  { name: 'Entwicklung', href: '#', current: false },
  { name: 'Awards', href: '#', current: false }
]
</script>
