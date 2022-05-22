<template>
  <main>
    <div v-if="loading">lädt...</div>
    <div v-else-if="error">oops {{ error }}</div>
    <div v-else>
      <div>
        <img class="h-32 w-full object-cover lg:h-48" :src="backgroundImage" alt="" />
      </div>
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
          <div class="flex">
            <img
              class="h-24 w-24 sm:h-32 sm:w-32"
              :src="`/teams/${$route.params.team}.svg`"
              alt=""
            />
          </div>
          <div
            class="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1"
          >
            <div class="sm:hidden md:block mt-6 min-w-0 flex-1">
              <h1 class="text-2xl font-bold text-gray-900 truncate uppercase">
                {{ team.teamsim }}
              </h1>
            </div>
            <div
              class="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4"
            >
              <button
                type="button"
                class="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                <MailIcon class="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                <span>Message</span>
              </button>
              <button
                type="button"
                class="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                <PhoneIcon class="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                <span>Call</span>
              </button>
            </div>
          </div>
        </div>
        <div class="hidden sm:block md:hidden mt-6 min-w-0 flex-1">
          <h1 class="text-2xl font-bold text-gray-900 truncate">
            {{ profile.name }}
          </h1>
        </div>
      </div>
    </div>
    <router-view />
  </main>
</template>

<script setup>
import { MailIcon, PhoneIcon } from '@heroicons/vue/solid'
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

const route = useRoute()

const { result, loading, error } = useQuery(
  gql`
    query getTeam($season: ID!, $teamid: ID!) {
      team(season: $season, teamid: $teamid) {
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
    season: 'TOHL13pre',
    teamid: route.params.team
  }
)
const team = computed(() => result.value.team || {})
const backgroundImage = computed(() =>
  result.value?.team?.teamid
    ? `https://www.my-tohl.org/tohl/img/teams/${result.value.team.teamid.toUpperCase()}_head.png`
    : ''
)

const profile = {
  name: 'Ricardo Cooper',
  email: 'ricardo.cooper@example.com',
  avatar:
    'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
  fields: [
    ['Phone', '(555) 123-4567'],
    ['Email', 'ricardocooper@example.com'],
    ['Title', 'Senior Front-End Developer'],
    ['Team', 'Product Development'],
    ['Location', 'San Francisco'],
    ['Sits', 'Oasis, 4th floor'],
    ['Salary', '$145,000'],
    ['Birthday', 'June 8, 1990']
  ]
}
</script>
