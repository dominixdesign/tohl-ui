<template>
  <!-- Static sidebar for desktop -->
  <div
    class="
      hidden
      bg-dizzle-light
      dark:bg-dizzle
      md:flex md:flex-shrink-0
      shadow
      border-r border-gray-700
    "
  >
    <div class="flex flex-col w-80">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
        <div class="flex items-center flex-shrink-0 px-4">
          <layout-logo class="h-16 m-auto my-6" />
        </div>
        <div class="mt-5 flex-1 flex flex-col">
          <nav class="flex-1 px-2 space-y-1">
            <!-- Current: "bg-indigo-800 text-white", Default: "" -->
            <NuxtLink
              v-for="entry in nav"
              :key="entry.path"
              :to="entry.path"
              class="
                group
                flex
                items-center
                px-2
                py-2
                text-sm
                font-medium
                rounded-sm
              "
              :class="
                active === entry.path
                  ? 'bg-secondary-800 text-white'
                  : 'text-gray-800 dark:text-gray-200 hover:text-gray-200 hover:bg-secondary-600 transform hover:translate-x-1 transition-transform'
              "
            >
              {{ entry.title }}
            </NuxtLink>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'StaticNav',
  computed: {
    ...mapState({
      nav: (state) => state.navigation.mainNav,
      active: (state) => state.route.path
    })
  }
}
</script>
