<template>
  <div>
    <games-event-time :minutes="event.minutes" :seconds="event.seconds" />
    <games-event-team :team="event.team" />
    <games-event-icon icon="hockey-mask-svgrepo-com" />
    <div class="w-12 px-2" />
    <div class="px-2">
      <player-linkedName :player="event.player" class="font-bold" /> wird eingewechselt.
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
