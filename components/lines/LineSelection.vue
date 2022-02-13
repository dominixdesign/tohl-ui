<template>
  <ul>
    <li
      v-for="line in lines"
      :key="'line-' + line"
      :class="selected === line ? 'active' : ''"
      @click="() => select(line)"
    >
      {{ line }}
    </li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'LineSelection',
  computed: {
    ...mapGetters({
      lines: 'lines/getFirstLevel',
      selected: 'lines/getSelected'
    })
  },
  methods: {
    select(line) {
      this.$store.commit('lines/select', line)
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
  display: inline-block;
  margin: 5px;
  padding: 5px 20px;
  cursor: pointer;
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
</style>
