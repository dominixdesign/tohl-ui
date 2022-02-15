<template>
  <div>
    <svg
      v-if="status === 2"
      xmlns="http://www.w3.org/2000/svg"
      class="stroke-yellow-600"
      viewBox="0 0 24 24"
      stroke-width="1.25"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <line x1="14" y1="12" x2="14" y2="12.01"></line>
      <line x1="10" y1="12" x2="10" y2="12.01"></line>
      <line x1="12" y1="10" x2="12" y2="10.01"></line>
      <line x1="12" y1="14" x2="12" y2="14.01"></line>
      <path d="M4.5 12.5l8 -8a4.94 4.94 0 0 1 7 7l-8 8a4.94 4.94 0 0 1 -7 -7"></path>
    </svg>
    <svg
      v-else-if="status === 3"
      xmlns="http://www.w3.org/2000/svg"
      class="stroke-red-700"
      viewBox="0 0 24 24"
      stroke-width="1.25"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <line x1="3" y1="21" x2="21" y2="21"></line>
      <path d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16"></path>
      <path d="M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4"></path>
      <line x1="10" y1="9" x2="14" y2="9"></line>
      <line x1="12" y1="7" x2="12" y2="11"></line>
    </svg>
    <svg
      v-else-if="status === 4"
      xmlns="http://www.w3.org/2000/svg"
      class="stroke-blue-400"
      viewBox="0 0 24 24"
      stroke-width="1.25"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M2 12h1"></path>
      <path d="M6 8h-2a1 1 0 0 0 -1 1v6a1 1 0 0 0 1 1h2"></path>
      <path
        d="M6 7v10a1 1 0 0 0 1 1h1a1 1 0 0 0 1 -1v-10a1 1 0 0 0 -1 -1h-1a1 1 0 0 0 -1 1z"
      ></path>
      <path d="M9 12h6"></path>
      <path
        d="M15 7v10a1 1 0 0 0 1 1h1a1 1 0 0 0 1 -1v-10a1 1 0 0 0 -1 -1h-1a1 1 0 0 0 -1 1z"
      ></path>
      <path d="M18 8h2a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-2"></path>
      <path d="M22 12h-1"></path>
    </svg>
    <svg
      v-else-if="status === 5"
      xmlns="http://www.w3.org/2000/svg"
      class="stroke-red-700"
      viewBox="0 0 24 24"
      stroke-width="1.25"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <circle cx="12" cy="12" r="9"></circle>
      <line x1="5.7" y1="5.7" x2="18.3" y2="18.3"></line>
    </svg>
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      class="stroke-green-800"
      viewBox="0 0 24 24"
      stroke-width="1.25"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M5 12l5 5l10 -10"></path>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'PlayerStatus',
  props: {
    status: Number
  },
  data() {
    let status = {
      color: 'green',
      icon: 'check'
    }
    if (this.status === 5) {
      status = { color: '#B92727', icon: 'ban' }
    } else if (this.status === 2) {
      status = { color: '#F29B05', icon: 'band-aid' }
    } else if (this.status === 3) {
      status = { color: '#B92727', icon: 'user-injured' }
    } else if (this.status === 4) {
      status = { color: '#006EC7', icon: 'umbrella-beach' }
    }

    return status
  }
}
</script>
