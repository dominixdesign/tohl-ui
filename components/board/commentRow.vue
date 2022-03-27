<template>
  <tr>
    <td class="w-2/12 p-2">
      <div class="flex space-x-3">
        <div class="flex-shrink-0">
          <team-logo-big :teamid="comment.manager.team.teamid" class="h-12 w-12" />
        </div>
        <div class="min-w-0 flex-1">
          <p class="text-sm font-medium text-gray-900">
            <a href="#" class="hover:underline">{{ comment.manager.username }}</a>
          </p>
        </div>
      </div>
    </td>
    <td class="w-10/12 p-2">
      <p class="w-full border-b border-gray-300 text-sm text-gray-500">
        <layout-datetime :date="comment.timestamp" format="relative" />
      </p>
      <div class="prose py-3 dark:prose-invert" v-html="content"></div>
    </td>
  </tr>
</template>

<script>
import { Marked } from '@ts-stack/markdown'

export default {
  props: {
    comment: Object
  },
  computed: {
    content() {
      return Marked.parse(this.comment.content)
    }
  }
}
</script>
