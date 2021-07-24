<template>
  <div>
    <!-- Current: "bg-gray-100 text-gray-900", Default: "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900" -->
    <button
      v-if="entry.children"
      @click="submenuOpen = !submenuOpen"
      type="button"
      class="
        group
        w-full
        flex
        items-center
        pr-2
        py-2
        text-sm
        font-medium
        text-gray-800
        dark:text-gray-200
        hover:text-gray-200 hover:bg-secondary-600
        transform
        hover:translate-x-1
        transition-transform
      "
      :aria-controls="`sub-menu-1${entry.title}`"
      :aria-expanded="submenuOpen"
    >
      <!-- Expanded: "text-gray-400 rotate-90", Collapsed: "text-gray-300" -->
      <svg
        class="
          text-gray-300
          mr-2
          flex-shrink-0
          h-5
          w-5
          transform
          group-hover:text-gray-400
          transition
          ease-in-out
          duration-150
        "
        :class="submenuOpen ? 'text-gray-400 rotate-90' : 'text-gray-300'"
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
      </svg>
      {{ entry.title }}
    </button>
    <!-- Expandable link section, show/hide based on state. -->
    <div class="space-y-1" :id="`sub-menu-1${entry.title}`" v-if="submenuOpen">
      <a
        href="#"
        class="
          group
          w-full
          flex
          items-center
          pl-10
          pr-2
          py-2
          text-sm
          font-medium
          text-gray-600
          rounded-md
          hover:text-gray-900 hover:bg-gray-50
        "
      >
        Overview
      </a>

      <a
        href="#"
        class="
          group
          w-full
          flex
          items-center
          pl-10
          pr-2
          py-2
          text-sm
          font-medium
          text-gray-600
          rounded-md
          hover:text-gray-900 hover:bg-gray-50
        "
      >
        Members
      </a>

      <a
        href="#"
        class="
          group
          w-full
          flex
          items-center
          pl-10
          pr-2
          py-2
          text-sm
          font-medium
          text-gray-600
          rounded-md
          hover:text-gray-900 hover:bg-gray-50
        "
      >
        Calendar
      </a>

      <a
        href="#"
        class="
          group
          w-full
          flex
          items-center
          pl-10
          pr-2
          py-2
          text-sm
          font-medium
          text-gray-600
          rounded-md
          hover:text-gray-900 hover:bg-gray-50
        "
      >
        Settings
      </a>
    </div>
    <NuxtLink
      v-if="!entry.children"
      :to="entry.path"
      @click.native="triggerRoute"
      class="
        group
        flex
        items-center
        pl-7
        pr-2
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
  </div>
</template>

<script>
export default {
  name: 'NavEntry',
  props: {
    entry: Object
  },
  data() {
    return {
      submenuOpen: false
    }
  }
}
</script>
