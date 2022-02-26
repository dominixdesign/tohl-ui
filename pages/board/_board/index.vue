<template>
  <section class="mx-auto max-w-screen-2xl p-6 xl:px-12">
    <layout-headline>{{ board.title }}</layout-headline>
    <table class="w-full table-fixed" v-if="board.posts">
      <tbody>
        <tr
          v-for="(post, index) of board.posts"
          :key="`board-${post.id}`"
          :class="index % 2 === 0 ? 'bg-white dark:bg-primary-800' : 'bg-gray-50 dark:bg-gray-900'"
        >
          {{
            post
          }}
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import gql from 'graphql-tag'

export default {
  async asyncData({ params }) {
    const board = params.board
    return { board }
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
          board: this.board,
          limit: 25
        }
      },
      update: ({ board }) => board
    }
  }
}
</script>
