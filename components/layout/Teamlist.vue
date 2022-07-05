<template>
  <nav class="bg-white border-b border-gray-200 hidden md:flex" aria-label="Breadcrumb">
    <ol role="list" class="max-w-screen-xl w-full mx-auto px-4 flex sm:px-6 lg:px-8">
      <li
        v-for="team in teams"
        :key="team.teamid"
        class="py-2 inline-block px-1 grow"
      >
        <img class="block object-contain h-6 scale-100 hover:scale-150" :src="`/teams/${team.teamid}.svg`" :alt="team.teamsim" />
      </li>
    </ol>
  </nav>
</template>
<script setup>
import { computed } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

const route = useRoute()

const { result, loading, error } = await useQuery(
  gql`
    query getTeams($season: String!) {
      teams(filter: { season: $season }) {
        teamid
        teamsim
        foreground @client
        background @client
      }
    }
  `,
  {
    season: `TOHL${route.params.season}` || 'TOHL13pre'
  }
)
const teams = computed(() => result.value.teams || [])
</script>
