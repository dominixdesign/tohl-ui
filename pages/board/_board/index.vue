<template>
  <section v-if="board" class="mx-auto max-w-screen-2xl p-6 xl:px-12">
    <layout-headline>{{ board.title }}</layout-headline>
    <table class="w-full table-fixed" v-if="board.posts">
      <tbody>
        <post-row
          v-for="(post, index) of board.posts"
          :key="`board-${post.id}`"
          :post="post"
          :class="index % 2 === 0 ? 'bg-white dark:bg-primary-800' : 'bg-gray-50 dark:bg-gray-900'"
        />
      </tbody>
    </table>
    <board-new-topic :board="boardid" :onSubmit="onSubmit" />
  </section>
</template>

<script>
import gql from 'graphql-tag'
import boardEditor from '~/components/board/boardEditor.vue'
import PostRow from '~/components/board/postRow.vue'

export default {
  components: { boardEditor, PostRow },
  async asyncData({ params }) {
    const boardid = params.board
    return { boardid }
  },
  methods: {
    onSubmit() {
      this.$apollo.queries.board.refetch()
    }
  },
  apollo: {
    board: {
      query: gql`
        query getBoard($board: ID!, $limit: Int) {
          board(board: $board) {
            id
            title
            parent {
              id
            }
            postCount
            posts(limit: $limit) {
              id
              board {
                id
              }
              title
              comments(limit: 1) {
                id
                timestamp
              }
            }
          }
        }
      `,
      variables() {
        return {
          board: this.boardid,
          limit: 25
        }
      },
      update: ({ board }) => board
    }
  }
}
</script>
