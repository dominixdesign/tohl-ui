<script setup>
import { computed } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

const { result, loading, error } = useQuery(
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
    season: 'TOHL13pre'
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
      class="space-y-4 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:grid-cols-4 lg:gap-8"
    >
      <li
        v-for="team in teams"
        :key="team.teamid"
        class="bg-gray-100 p-4 rounded-sm team-box"
        :style="`--teamBackground: ${team.background}; --teamForeground: ${team.foreground};`"
      >
        <div class="flex items-center space-x-4 lg:space-x-6">
          <img
            class="w-16 h-16 rounded-full lg:w-20 lg:h-20 bg-white"
            :src="`/teams/${team.teamid}.svg`"
            :alt="team.teamsim"
          />
          <div class="font-medium text-lg leading-6 space-y-1">
            <h3>{{ team.teamsim }}</h3>
            <p class="text-indigo-600">{{ team.id }}</p>
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
</style>
