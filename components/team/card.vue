<template>
  <div
    class="
      col-span-1
      flex flex-col
      text-center
      bg-white
      dark:bg-gray-600
      rounded-lg
      shadow
      divide-y divide-gray-600
      dark:divide-white
      divide-opacity-20 divide-dashed
      overflow-hidden
    "
  >
    <div
      class="flex-1 flex flex-col p-6 pb-1"
      :style="`background-color: ${backgroundColor}; color: ${foregroundColor};`"
    >
      <div class="flex justify-center items-center flex-row pb-3">
        <team-logo-middle :teamid="team.teamid" class="flex-none" />
        <div class="font-bold text-4xl p-2 flex-grow uppercase font-headline">
          {{ team.teamsim }}
        </div>
      </div>
    </div>
    <div>
      <div class="flex">
        <div class="w-0 flex-1 flex">
          <nuxt-link
            :to="`/${season}/team/${team.teamid}/roster`"
            class="
              relative
              -mr-px
              w-0
              flex-1
              inline-flex
              items-center
              justify-center
              py-4
              text-sm text-gray-700
              dark:text-white
              font-medium
              rounded-bl-lg
              hover:text-primary-500
              dark:hover:text-primary-200
            "
          >
            <svg
              class="w-5 h-5 text-primary-500 dark:text-primary-200 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="ml-3">Roster</span>
          </nuxt-link>
          <nuxt-link
            :to="`/${season}/team/${team.teamid}/lines`"
            class="
              relative
              -mr-px
              w-0
              flex-1
              inline-flex
              items-center
              justify-center
              py-4
              text-sm text-gray-700
              dark:text-white
              font-medium
              rounded-bl-lg
              hover:text-primary-500
              dark:hover:text-primary-200
            "
          >
            <svg
              class="w-5 h-5 text-primary-500 dark:text-primary-200 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path
                fill-rule="evenodd"
                d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="ml-3">Lines</span>
          </nuxt-link>
          <nuxt-link
            :to="`/${season}/team/${team.teamid}/vitals`"
            class="
              relative
              -mr-px
              w-0
              flex-1
              inline-flex
              items-center
              justify-center
              py-4
              text-sm text-gray-700
              dark:text-white
              font-medium
              rounded-bl-lg
              hover:text-primary-500
              dark:hover:text-primary-200
            "
          >
            <svg
              class="w-5 h-5 text-primary-500 dark:text-primary-200 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="ml-3">Vitals</span>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    team: Object
  },
  computed: {
    ...mapGetters({
      season: 'navigation/season'
    }),
    backgroundColor() {
      return this.$store.getters['teams/backgroundByTeam'](this.team.teamid)
    },
    foregroundColor() {
      return this.$store.getters['teams/foregroundByTeam'](this.team.teamid)
    }
  }
}
</script>
