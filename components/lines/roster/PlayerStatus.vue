<template>
  <font-awesome-icon :icon="icon" :style="{ color }" transform="up-3 grow-3" />
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
