<template>
  <section class="mx-auto max-w-screen-2xl p-6 xl:px-12">
    <layout-headline>Foren</layout-headline>
    <table class="w-full table-fixed" v-if="boards">
      <tbody>
        <board-row
          v-for="(board, index) of boards"
          :key="`board-${board.id}`"
          :board="board"
          :class="index % 2 === 0 ? 'bg-white dark:bg-primary-800' : 'bg-gray-50 dark:bg-gray-900'"
        />
      </tbody>
    </table>
  </section>
</template>

<script>
import gql from 'graphql-tag'

export default {
  apollo: {
    boards: {
      query: gql`
        query getBoards {
          boards {
            id
            title
            parent {
              id
            }
            postCount
            posts(limit: 1) {
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
      update: ({ boards }) => boards
    }
  }
}
</script>
