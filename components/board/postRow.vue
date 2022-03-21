<template>
  <tr>
    <td class="w-6/12 p-2">
      <nuxt-link :to="`/board/${post.board.id}/${post.id}`">{{ post.title }}</nuxt-link>
    </td>
    <td class="w-2/12 p-2">{{ 't' }}</td>
    <td class="w-4/12 p-2" v-if="latestPostTitle">
      <span>{{ latestCommentDate }}</span>
    </td>
    <td class="w-4/12 p-2" v-else></td>
  </tr>
</template>

<script>
export default {
  props: {
    post: Object
  },
  computed: {
    latestCommentDate() {
      if (this.post) {
        if (this.post?.comments[0].timestamp) {
          const date = new Date(this.post.comments[0].timestamp)
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
