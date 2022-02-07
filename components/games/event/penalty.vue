<template>
  <div>
    <games-event-time :minutes="event.minutes" :seconds="event.seconds" />
    <games-event-team :team="event.team" />
    <games-event-icon icon="whistle-svgrepo-com" />
    <div class="w-12 px-2 text-center text-gray-500">{{ event.length }}min</div>
    <div class="px-2">
      <player-linkedName :player="event.player" class="font-bold" /> ({{ event.offense }})
    </div>
  </div>
</template>

<script>
export default {
  props: {
    event: Object
  }
}
</script>
