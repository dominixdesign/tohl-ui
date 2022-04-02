<template>
  <h3 class="flex items-center font-mono text-2xl font-bold">
    <div class="relative inline-block text-left" v-click-outside="hide">
      <div>
        <button
          type="button"
          @click="() => (dropdown = !dropdown)"
          class="
            inline-flex
            items-center
            justify-center
            rounded-md
            bg-gray-50
            px-3
            py-1
            hover:bg-gray-200
            focus:outline-none
            focus:ring-2
            focus:ring-indigo-500
            focus:ring-offset-2
            focus:ring-offset-gray-100
            dark:bg-gray-700
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
            absolute
            right-0
            z-50
            mt-2
            w-56
            origin-top-right
            rounded-md
            bg-white
            shadow-lg
            ring-1 ring-black ring-opacity-5
            transition
            focus:outline-none
            dark:bg-primary-700 dark:text-white
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
                block
                px-4
                py-2
                text-sm text-gray-700
                hover:bg-gray-100
                dark:text-white dark:hover:bg-primary-500
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
