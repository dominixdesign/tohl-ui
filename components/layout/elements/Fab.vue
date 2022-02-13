<template>
  <portal to="floating">
    <div
      class="
        fixed
        bottom-10
        right-4
        z-20
        flex
        h-14
        w-14
        flex-col
        items-center
        justify-center
        rounded-full
        bg-secondary-500
        text-white
        shadow
      "
      @click="isOpen = !isOpen"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
        />
      </svg>
    </div>
    <ul class="fixed bottom-20 right-2 flex h-40 w-14 flex-col transition-all">
      <li class="subaction" :class="isOpen ? 'bottom-0' : '-bottom-40'">
        <div class="title" :class="isOpen ? 'opacity-100' : 'opacity-0'">speichern</div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="1.25"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2"></path>
          <circle cx="12" cy="14" r="2"></circle>
          <polyline points="14 4 14 8 8 8 8 4"></polyline>
        </svg>
      </li>
      <li class="subaction" :class="isOpen ? 'bottom-0' : '-bottom-24'">
        <div class="title" :class="isOpen ? 'opacity-100' : 'opacity-0'">import</div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="1.25"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
          <path
            d="M5 13v-8a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2h-5.5m-9.5 -2h7m-3 -3l3 3l-3 3"
          ></path>
        </svg>
      </li>
      <li class="subaction" :class="isOpen ? 'bottom-0' : '-bottom-16'">
        <div class="title" :class="isOpen ? 'opacity-100' : 'opacity-0'">abschicken</div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="1.25"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M12 18h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v7.5"></path>
          <path d="M3 6l9 6l9 -6"></path>
          <path d="M15 18h6"></path>
          <path d="M18 15l3 3l-3 3"></path>
        </svg>
      </li>
    </ul>
  </portal>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false
    }
  }
}
</script>

<style scoped>
.subaction {
  @apply relative z-10 mb-2 flex h-10 w-10 flex-row items-center justify-center rounded-full bg-primary-500 text-white shadow transition-all duration-300 ease-out;
}
.subaction .title {
  @apply absolute right-12 bg-primary-800 py-1 px-2 text-white;
}
</style>
