<template>
  <component
    :is="component"
    :event="event"
    class="flex items-center py-1"
    :class="[index % 2 === 0 ? 'bg-gray-50' : 'bg-white']"
  />
</template>

<script>
import { compact } from 'lodash-es'
export default {
  props: {
    event: Object,
    index: Number
  },
  computed: {
    component() {
      if (this.event.__typename === 'Goal') {
        return 'games-event-goal'
      }
      if (this.event.__typename === 'Penalty') {
        return 'games-event-penalty'
      }
      if (this.event.type === 'fight' || this.event.type === 'draw') {
        return 'games-event-fight'
      }
      if (this.event.type === 'goalie') {
        return 'games-event-goalie'
      }
      if (this.event.type === 'injury') {
        return 'games-event-injury'
      }
      if (this.event.type === 'ejection') {
        return 'games-event-ejection'
      }
    }
  }
}
</script>
