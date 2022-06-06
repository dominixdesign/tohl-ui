<script setup>
import { computed } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { UserGroupIcon, CurrencyDollarIcon } from '@heroicons/vue/solid'

const route = useRoute()

const { result, loading, error } = await useQuery(
  gql`
    query getTeams($season: String!) {
      teams(filter: { season: $season }) {
        teamid
        teamsim
        season
        conference
        division
        foreground @client
        background @client
      }
    }
  `,
  {
    season: `TOHL${route.params.season}`
  }
)
const teams = computed(() => result.value.teams || [])
</script>

<template>
  <main>
    <h2>Teams of {{ $route.params.season }}</h2>
    <div v-if="loading">laden...</div>
    <div v-else-if="error">oops {{ error }}</div>
    <ul
      v-else
      role="list"
      class="space-y-4 sm:grid sm:grid-cols-2 md:grid-cols-3 sm:gap-6 sm:space-y-0 lg:grid-cols-3 xl:grid-cols-4 lg:gap-8"
    >
      <li
        v-for="team in teams"
        :key="team.teamid"
        class="group bg-gray-100 p-4 rounded-sm team-box"
        :style="`--teamBackground: ${team.background}; --teamForeground: ${team.foreground};`"
      >
        <div class="flex items-center space-x-4 lg:space-x-6">
          <img
            class="w-16 h-16 lg:w-20 lg:h-20"
            :src="`/teams/${team.teamid}.svg`"
            :alt="team.teamsim"
          />
          <div class="font-medium text-lg leading-6 space-x-1 space-y-1">
            <h3 class="uppercase">{{ team.teamsim }}</h3>
            <NuxtLink
              type="button"
              :to="`/TOHL${$route.params.season}/team/${team.teamid}/roster`"
              class="inline-flex items-center px-2 py-1 border border-transparent shadow-sm text-xs leading-4 font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <UserGroupIcon class="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
              Roster
            </NuxtLink>
            <NuxtLink
              type="button"
              :to="`/TOHL${$route.params.season}/team/${team.teamid}/finances`"
              class="inline-flex items-center px-2 py-1 border border-transparent shadow-sm text-xs leading-4 font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <CurrencyDollarIcon class="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
              Finanzen
            </NuxtLink>
          </div>
        </div>
      </li>
    </ul>
  </main>
</template>

<style scoped>
.team-box:hover {
  background-color: var(--teamBackground);
  color: var(--teamForeground);
}
.team-box:hover ul {
  color: var(--teamForeground);
}
</style>
