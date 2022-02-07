<template>
  <div>
    <games-event-time :minutes="event.minutes" :seconds="event.seconds" />
    <games-event-team :team="event.team" />
    <games-event-icon icon="fight-svgrepo-com" />
    <div class="w-12 px-2" />
    <div class="px-2" v-if="event.type === 'draw'">
      Kampf zwischen <player-linkedName :player="event.player" class="font-bold" /> und
      <player-linkedName :player="event.player2" class="font-bold" /> ohne Sieger.
    </div>
    <div class="px-2" v-else>{{ event.player }}</div>
  </div>
</template>

<script>
export default {
  props: {
    event: Object
  }
}
</script>
