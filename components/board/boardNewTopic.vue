<template>
  <div class="mt-4">
    <layout-headline>Neuen Beitrag schreiben</layout-headline>
    <div
      class="
        space-y-8
        divide-y divide-gray-400
        bg-gray-200
        p-3
        dark:divide-primary-700 dark:bg-primary-800
        sm:space-y-5
      "
    >
      <div>
        <div class="mt-1">
          <input
            type="text"
            v-model="title"
            name="title"
            id="title"
            placeholder="Titel"
            class="
              block
              w-full
              min-w-0
              flex-1
              rounded-sm
              border border-gray-400
              bg-white
              p-2
              outline-none
              focus:border-primary-200 focus:shadow-[0px_0px_20px_-7px_#75BCFF]
              dark:border-primary-700 dark:bg-primary-900 dark:focus:border-primary-500
            "
          />
        </div>
      </div>
      <div class="pt-2">
        <board-editor v-model="comment" :key="`board-editor-${editorKey}`" />
      </div>

      <div class="pt-2">
        <div class="flex justify-end">
          <div class="py-2 px-4 font-bold text-secondary-600">{{ error }}</div>
          <button
            type="submit"
            @click.stop="submitForm"
            class="
              group
              relative
              flex
              justify-center
              rounded-md
              border border-transparent
              bg-primary-600
              py-2
              px-4
              text-sm
              font-medium
              text-white
              hover:bg-primary-700
              focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
            "
          >
            Beitrag hinzufügen
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  props: {
    board: String,
    onSubmit: Function
  },
  data() {
    return {
      editorKey: 1,
      error: '',
      title: '',
      comment: ''
    }
  },
  methods: {
    //title: String, board: ID, comment: String
    async submitForm() {
      this.error = ''
      const error = []
      if (this.title === '') {
        error.push('kein Titel eingegeben')
      }
      if (this.comment === '') {
        error.push('kein Kommentar eingegeben')
      }
      if (error.length > 0) {
        this.error = error.join(' | ')
      }
      const res = await this.$apollo
        .mutate({
          mutation: gql`
            mutation addPost($title: String, $board: ID, $comment: String) {
              addPost(title: $title, board: $board, comment: $comment)
            }
          `,
          variables: { title: this.title, board: this.board, comment: this.comment }
        })
        .then(() => {
          this.error = ''
          this.title = ''
          this.comment = ''
          this.editorKey++
          this.onSubmit()
        })
    }
  }
}
</script>

<style></style>
