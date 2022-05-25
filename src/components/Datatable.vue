<script setup>
import { TabulatorFull as Tabulator } from 'tabulator-tables'
import { onMounted, defineProps, toRefs } from 'vue'

const props = defineProps({
  tabledata: Array,
  columns: Array
})
const { tabledata, columns } = toRefs(props)

onMounted(() => {
  //initialize table
  var table = new Tabulator('#example-table', {
    data: structuredClone(tabledata.value),
    columns: structuredClone(columns.value),
    groupBy: 'seasondata.pos'
  })
})
</script>

<template>
  <div id="example-table" class="striped very-compact"></div>
</template>
