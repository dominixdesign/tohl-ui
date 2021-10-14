<template>
  <h3 class="font-bold text-2xl font-headline flex items-center">
    <team-logo-middle :teamid="currentTeam" />
    <div class="relative inline-block text-left" v-click-outside="hide">
      <div>
        <button
          type="button"
          @click="() => (dropdown = !dropdown)"
          class="
            inline-flex
            justify-center
            px-3
            py-1
            rounded-md
            bg-gray-50
            dark:bg-gray-700
            ml-5
            items-center
            hover:bg-gray-200
            focus:outline-none
            focus:ring-2
            focus:ring-offset-2
            focus:ring-offset-gray-100
            focus:ring-indigo-500
          "
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
        >
          <team-name class="ml-2" :teamid="currentTeam" />
          <svg
            class="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
      <transition
        enter-active-class="ease-out duration-100"
        leave-active-class="ease-in duration-75"
        enter-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div
          v-if="dropdown"
          class="
            transition
            origin-top-right
            absolute
            right-0
            mt-2
            w-56
            z-50
            rounded-md
            shadow-lg
            bg-white
            dark:bg-primary-700 dark:text-white
            ring-1 ring-black ring-opacity-5
            focus:outline-none
          "
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabindex="-1"
        >
          <div class="py-1" role="none">
            <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
            <nuxt-link
              v-for="team in teams"
              :key="team.teamid"
              :to="getLink(team.teamid)"
              class="
                text-gray-700
                block
                px-4
                py-2
                text-sm
                hover:bg-gray-100
                dark:hover:bg-primary-500 dark:text-white
              "
              role="menuitem"
              tabindex="-1"
              id="menu-item-0"
              >{{ team.full_name || team.teamsim }}</nuxt-link
            >
          </div>
        </div>
      </transition>
    </div>

    <div>
      <div class="sm:hidden">
        <label for="tabs" class="sr-only">Select a tab</label>
        <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
        <select
          id="tabs"
          name="tabs"
          class="
            block
            w-full
            focus:ring-indigo-500 focus:border-indigo-500
            border-gray-300
            rounded-md
          "
        >
          <option>My Account</option>

          <option>Company</option>

          <option selected>Team Members</option>

          <option>Billing</option>
        </select>
      </div>
      <div class="hidden sm:block ml-5">
        <nav class="flex space-x-4" aria-label="Tabs">
          <!-- Current: "bg-gray-200 text-gray-800", Default: "text-gray-600 hover:text-gray-800" -->
          <a
            href="#"
            aria-current="page"
            class="bg-gray-200 text-gray-800 px-3 py-2 font-medium text-sm rounded-md"
            :style="`background-color: ${backgroundColor}; color: ${foregroundColor};`"
          >
            Roster
          </a>

          <a
            href="#"
            class="text-gray-600 hover:text-gray-800 px-3 py-2 font-medium text-sm rounded-md"
          >
            Lines
          </a>

          <a
            href="#"
            class="text-gray-600 hover:text-gray-800 px-3 py-2 font-medium text-sm rounded-md"
          >
            Vitals
          </a>

          <a
            href="#"
            class="text-gray-600 hover:text-gray-800 px-3 py-2 font-medium text-sm rounded-md"
          >
            Finanzen
          </a>
        </nav>
      </div>
    </div>
  </h3>
</template>

<script>
import gql from 'graphql-tag'

export default {
  props: {
    currentTeam: String
  },
  data() {
    return {
      dropdown: false
    }
  },
  apollo: {
    teams: {
      query: gql`
        query getTeams($season: String!) {
          teams(filter: { season: $season }) {
            teamid
            teamsim
            season
            conference
            division
          }
        }
      `,
      variables() {
        return {
          season: this.$store.getters['navigation/season']
        }
      },
      update: ({ teams }) => teams,
      error() {
        this.error = true
      }
    }
  },
  computed: {
    backgroundColor() {
      return this.$store.getters['teams/backgroundByTeam'](this.currentTeam)
    },
    foregroundColor() {
      return this.$store.getters['teams/foregroundByTeam'](this.currentTeam)
    }
  },
  methods: {
    hide() {
      this.dropdown = false
    },
    getLink(team) {
      return this.$route.fullPath.replace(`/${this.currentTeam}/`, `/${team}/`)
    }
  }
}
</script>
