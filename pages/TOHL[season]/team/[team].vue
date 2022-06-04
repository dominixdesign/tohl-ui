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
            <div>
              <div class="sm:hidden">
                <label for="tabs" class="sr-only">Unterseite wählen</label>
                <select
                  id="tabs"
                  name="tabs"
                  @change="(e) => $router.push(e.target.value)"
                  class="block w-full bg-gray-100 p-2 border-gray-200 border focus:ring-primary-500 focus:border-primary-500 rounded-md"
                >
                  <option
                    v-for="tab in tabs"
                    :key="tab.name"
                    :selected="tab.current"
                    :value="tab.href"
                  >
                    {{ tab.name }}
                  </option>
                </select>
              </div>
              <div class="hidden sm:block">
                <nav class="flex space-x-4" aria-label="Tabs">
                  <NuxtLink
                    v-for="tab in tabs"
                    :key="tab.name"
                    :to="tab.href"
                    :style="[
                      tab.current
                        ? `background: ${team.background}; color: ${team.foreground};`
                        : ''
                    ]"
                    :class="[
                      tab.current ? '' : 'text-gray-500 hover:text-gray-700',
                      'px-3 py-2 font-medium text-sm rounded-md'
                    ]"
                    :aria-current="tab.current ? 'page' : undefined"
                  >
                    {{ tab.name }}
                  </NuxtLink>
                </nav>
              </div>
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
    <NuxtPage />
  </main>
</template>

<script setup>
import { MailIcon, PhoneIcon } from '@heroicons/vue/solid'
import { computed } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

const route = useRoute()
const { currentRoute } = useRouter()

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

const tabs = computed(() => [
  {
    name: 'Roster',
    href: `/TOHL${route.params.season}/team/${route.params.team}/roster`,
    current:
      `/TOHL${route.params.season}/team/${route.params.team}/roster` === currentRoute.value.path
  },
  {
    name: 'Finanzen',
    href: `/TOHL${route.params.season}/team/${route.params.team}/finances`,
    current:
      `/TOHL${route.params.season}/team/${route.params.team}/finances` === currentRoute.value.path
  },
  { name: 'Team Members', href: '#' },
  { name: 'Billing', href: '#' }
])

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
