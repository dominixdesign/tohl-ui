<template>
  <nav class="border-t border-gray-200 px-4 flex items-center justify-between sm:px-0">
    <div class="-mt-px w-0 flex-1 flex">
      <nuxt-link
        v-if="previous > 0"
        :to="`${basePath}${previous}`"
        class="
          border-t-2 border-transparent
          pt-4
          pr-1
          inline-flex
          items-center
          text-sm
          font-medium
          text-gray-500
          hover:text-primary-700 hover:border-primary-300
        "
      >
        <!-- Heroicon name: solid/arrow-narrow-left -->
        <svg
          class="mr-3 h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
            clip-rule="evenodd"
          />
        </svg>
        Vorheriger Spieltag
      </nuxt-link>
    </div>
    <div class="hidden md:-mt-px md:flex">
      <component
        v-for="(entry, index) in entries"
        :key="`pagination-${entry}-${index}`"
        :is="entry > 0 ? 'nuxt-link' : 'span'"
        :to="entry > 0 ? `${basePath}${entry}` : null"
        :class="[
          entry > 0
            ? [
                'cursor-pointer',
                'border-t-2',
                'pt-4',
                'px-4',
                'inline-flex',
                'items-center',
                'text-sm',
                'font-medium'
              ]
            : '',
          entry === 0
            ? [
                'border-transparent',
                'text-gray-500',
                'border-t-2',
                'pt-4',
                'px-4',
                'inline-flex',
                'items-center',
                'text-sm',
                'font-medium'
              ]
            : '',
          entry === current ? ['text-primary-500', 'border-primary-500'] : '',
          entry !== current && entry > 0
            ? [
                'border-transparent',
                'text-gray-500',
                'hover:text-gray-700',
                'hover:border-gray-300'
              ]
            : ''
        ]"
      >
        {{ entry === 0 ? '...' : entry }}
      </component>
    </div>
    <div class="-mt-px w-0 flex-1 flex justify-end">
      <nuxt-link
        v-if="next < max"
        :to="`${basePath}${next}`"
        class="
          border-t-2 border-transparent
          pt-4
          pl-1
          inline-flex
          items-center
          text-sm
          font-medium
          text-gray-500
          hover:text-gray-700 hover:border-gray-300
        "
      >
        Nächster Spieltag
        <svg
          class="ml-3 h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </nuxt-link>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    max: {
      require: true,
      type: Number
    },
    current: {
      require: false,
      type: Number,
      default: 1
    },
    min: {
      require: false,
      type: Number,
      default: 1
    },
    onSelect: {
      type: Function
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  computed: {
    entries() {
      const entries = []
      if (this.current - 1 > this.min) {
        entries.push(this.min)
      }
      if (this.current > 2) {
        entries.push(0)
      }
      if (this.current - 1 > 0) {
        entries.push(this.current - 1)
      }
      entries.push(this.current)
      if (this.current + 1 <= this.max) {
        entries.push(this.current + 1)
      }
      if (this.current < this.max - 1) {
        entries.push(0)
      }
      if (this.current + 1 < this.max) {
        entries.push(this.max)
      }

      return entries
    },
    previous() {
      return this.current - 1
    },
    next() {
      return this.current + 1
    }
  }
}
</script>
