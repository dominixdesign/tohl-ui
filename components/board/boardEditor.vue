<template>
  <div>
    <div class="flex flex-wrap justify-end">
      <button @click="applyBold" class="button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="1.25"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M7 5h6a3.5 3.5 0 0 1 0 7h-6z"></path>
          <path d="M13 12h1a3.5 3.5 0 0 1 0 7h-7v-7"></path>
        </svg>
      </button>
      <button @click="applyItalic" class="button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="1.25"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <line x1="11" y1="5" x2="17" y2="5"></line>
          <line x1="7" y1="19" x2="13" y2="19"></line>
          <line x1="14" y1="5" x2="10" y2="19"></line>
        </svg>
      </button>
      <button @click="applyHeading" class="button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="1.25"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M19 18v-8l-2 2"></path>
          <path d="M4 6v12"></path>
          <path d="M12 6v12"></path>
          <path d="M11 18h2"></path>
          <path d="M3 18h2"></path>
          <path d="M4 12h8"></path>
          <path d="M3 6h2"></path>
          <path d="M11 6h2"></path>
        </svg>
      </button>
      <button @click="applyUl" class="button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="1.25"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <line x1="9" y1="6" x2="20" y2="6"></line>
          <line x1="9" y1="12" x2="20" y2="12"></line>
          <line x1="9" y1="18" x2="20" y2="18"></line>
          <line x1="5" y1="6" x2="5" y2="6.01"></line>
          <line x1="5" y1="12" x2="5" y2="12.01"></line>
          <line x1="5" y1="18" x2="5" y2="18.01"></line>
        </svg>
      </button>
      <button @click="applyOl" class="button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="1.25"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M11 6h9"></path>
          <path d="M11 12h9"></path>
          <path d="M12 18h8"></path>
          <path d="M4 16a2 2 0 1 1 4 0c0 .591 -.5 1 -1 1.5l-3 2.5h4"></path>
          <path d="M6 10v-6l-2 2"></path>
        </svg>
      </button>
      <button @click="undo" class="button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="1.25"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M9 13l-4 -4l4 -4m-4 4h11a4 4 0 0 1 0 8h-1"></path>
        </svg>
      </button>
      <button @click="redo" class="button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="1.25"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M15 13l4 -4l-4 -4m4 4h-11a4 4 0 0 0 0 8h1"></path>
        </svg>
      </button>
    </div>
    <div
      @input="onInput"
      v-html="innerValue"
      contenteditable="true"
      class="
        prose
        h-72
        max-w-full
        rounded-sm
        border border-gray-400
        bg-white
        p-4
        outline-none
        focus:border-primary-200 focus:shadow-[0px_0px_20px_-7px_#75BCFF]
        dark:prose-invert dark:border-primary-700 dark:bg-primary-900 dark:focus:border-primary-500
      "
    />
  </div>
</template>

<script>
import { Marked } from '@ts-stack/markdown'
import TurndownService from 'turndown'

export default {
  props: ['value'],

  data() {
    return {
      innerValue: Marked.parse(this.value) || '<p><br></p>'
    }
  },
  mounted() {
    document.execCommand('defaultParagraphSeparator', false, 'p')
  },
  methods: {
    onInput(event) {
      const turndown = new TurndownService({
        emDelimiter: '_',
        linkStyle: 'inlined',
        headingStyle: 'atx'
      })

      this.$emit('input', turndown.turndown(event.target.innerHTML))
    },
    applyBold() {
      document.execCommand('bold')
    },
    applyItalic() {
      document.execCommand('italic')
    },
    applyHeading() {
      document.execCommand('formatBlock', false, '<h1>')
    },
    applyUl() {
      document.execCommand('insertUnorderedList')
    },
    applyOl() {
      document.execCommand('insertOrderedList')
    },
    undo() {
      document.execCommand('undo')
    },
    redo() {
      document.execCommand('redo')
    }
  }
}
</script>

<style scoped>
.button {
  @apply mb-3 mr-2 px-2 py-1;
}
.button:hover {
  @apply rounded bg-gray-300;
}
.dark .button:hover {
  @apply rounded bg-primary-700;
}
.button svg {
  @apply h-6 w-6;
}
</style>
