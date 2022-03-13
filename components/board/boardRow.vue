<template>
  <tr>
    <td class="w-6/12 p-2">
      <nuxt-link :to="`/board/${board.id}/`">{{ board.title }}</nuxt-link>
    </td>
    <td class="w-2/12 p-2">{{ $tc(`board.postCount`, board.postCount) }}</td>
    <td class="w-4/12 p-2" v-if="latestPostTitle">
      <span class="font-bold">{{ latestPostTitle }}</span
      ><br /><span>{{ latestCommentDate }}</span>
    </td>
    <td class="w-4/12 p-2" v-else></td>
  </tr>
</template>

<script>
export default {
  props: {
    board: Object
  },
  computed: {
    latestPostTitle() {
      if (this.board.posts.length > 0) {
        return this.board.posts[0].title
      }
    },
    latestCommentDate() {
      if (this.board) {
        if (this.board?.posts[0].comments[0].timestamp) {
          const date = new Date(this.board.posts[0].comments[0].timestamp)
          return new Intl.DateTimeFormat('de-DE', {
            dateStyle: 'full',
            timeStyle: 'short'
          }).format(date)
        }
      }
    }
  }
}
</script>
