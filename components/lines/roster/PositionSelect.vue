<template>
  <ul>
    <li
      v-for="pos in positions"
      :key="'pos-' + pos"
      :class="selected === pos ? 'active' : ''"
      @click="() => select(pos)"
    >
      {{ pos }}
      <div class="warning fa-lg" v-if="hasError(pos)">error</div>
    </li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PositionSelection',
  data() {
    return {
      positions: ['G', 'D', 'LW', 'RW', 'C']
    }
  },
  computed: {
    ...mapGetters({
      selected: 'roster/getSelected'
    })
  },
  methods: {
    select(line) {
      this.$store.commit('roster/selectPos', line)
    },
    hasError(pos) {
      return (
        !this.$store.getters['roster/isInLimits'](pos) ||
        this.$store.getters['roster/getDressedByPos'](pos).some((p) => p.status > 2)
      )
    }
  }
}
</script>

<style scoped>
ul {
  list-style: none;
  text-align: center;
}
li {
  position: relative;
  display: inline-block;
  margin: 5px;
  padding: 5px 20px;
  background-color: #006ec7;
  color: #fff;
  border-radius: 5px;
  -webkit-box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.32);
  -moz-box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.32);
  box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.32);
}
li.active {
  background-color: #b92727;
}
.warning {
  display: block;
  position: absolute;
  top: -3px;
  right: -3px;
}
</style>
