<template>
  <div class="mt-4">
    <layout-headline>Antwort schreiben</layout-headline>
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
            Antwort hinzufügen
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
    post: String,
    onSubmit: Function
  },
  data() {
    return {
      editorKey: 1,
      error: '',
      comment: ''
    }
  },
  methods: {
    //title: String, board: ID, comment: String
    async submitForm() {
      this.error = ''
      const error = []
      if (this.comment === '') {
        error.push('kein Kommentar eingegeben')
      }
      if (error.length > 0) {
        this.error = error.join(' | ')
      }
      const res = await this.$apollo
        .mutate({
          mutation: gql`
            mutation addComment($parent: String, $comment: String) {
              addComment(parent: $parent, comment: $comment)
            }
          `,
          variables: { parent: this.post, comment: this.comment }
        })
        .then(() => {
          this.error = ''
          this.comment = ''
          this.editorKey++
          this.onSubmit()
        })
    }
  }
}
</script>

<style></style>
