<template>
  <div>
    <games-event-time :minutes="event.minutes" :seconds="event.seconds" />
    <games-event-team :team="event.team" />
    <games-event-icon icon="siren-svgrepo-com" />
    <div class="w-12 px-2 text-center text-xl font-bold text-secondary-600">
      {{ event.score }}
    </div>
    <div class="px-2">
      <player-linkedName :player="event.goalscorer" class="font-bold" />
      <span v-if="event.primaryassist && event.secondaryassist">
        (<player-linkedName :player="event.primaryassist" />,
        <player-linkedName :player="event.secondaryassist" />)
      </span>
      <span v-else-if="event.primaryassist">
        (<player-linkedName :player="event.primaryassist" />)
      </span>
      <span
        v-if="event.tags.indexOf('gamewinner') >= 0"
        class="rounded-xl bg-gray-400 px-2 py-1 text-sm font-bold text-gray-100"
        >GWG</span
      >
      <span
        v-if="event.situation"
        class="rounded-xl bg-gray-400 px-2 py-1 text-sm font-bold uppercase text-gray-100"
        >{{ event.situation }}</span
      >
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
