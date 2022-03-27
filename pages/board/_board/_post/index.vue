<template>
  <section v-if="post" class="mx-auto max-w-screen-2xl p-6 xl:px-12">
    <layout-headline>{{ post.title }}</layout-headline>
    <table class="mt-2 w-full table-fixed" v-if="post.comments">
      <tbody class="divide-y-4 divide-gray-100 dark:divide-gray-800">
        <board-comment-row
          v-for="(comment, index) of post.comments"
          :key="`comment-${comment.id}`"
          :comment="comment"
          :class="index % 2 === 0 ? 'bg-white dark:bg-primary-800' : 'bg-gray-50 dark:bg-gray-900'"
        />
      </tbody>
    </table>
    <board-new-comment :post="postid" :onSubmit="onSubmit" />
  </section>
</template>

<script>
import gql from 'graphql-tag'
import boardEditor from '~/components/board/boardEditor.vue'

export default {
  components: { boardEditor },
  async asyncData({ params }) {
    const boardid = params.board
    return { boardid, postid: params.post }
  },
  methods: {
    onSubmit() {
      this.$apollo.queries.post.refetch()
    }
  },
  apollo: {
    post: {
      query: gql`
        query getPost($post: ID!, $limit: Int) {
          post(post: $post) {
            id
            board {
              id
            }
            title
            comments(limit: $limit) {
              id
              timestamp
              content
              karma
              manager {
                username
                team {
                  teamid
                }
              }
            }
          }
        }
      `,
      variables() {
        return {
          post: this.postid,
          limit: 25
        }
      },
      update: ({ post }) => post
    }
  }
}
</script>
