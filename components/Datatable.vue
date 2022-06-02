<script setup>
import { TabulatorFull as Tabulator } from 'tabulator-tables'
import { onMounted, toRefs } from 'vue'

const props = defineProps({
  tabledata: Array,
  columns: Array
})
const { tabledata, columns } = toRefs(props)

onMounted(() => {
  const columns2 = columns.value.map((c) => Object.assign({}, c))

  //initialize table
  var table = new Tabulator('#example-table', {
    data: structuredClone(tabledata.value),
    columns: columns2,
    groupBy: 'seasondata.pos',
    layout: 'fitColumns',
    height: '90vh',
    responsiveLayout: true,
    resizableColumnFit: true,
    groupHeader: function (value, count, data, group) {
      //value - the value all members of this group share
      //count - the number of rows in this group
      //data - an array of all the row data objects in this group
      //group - the group component for the group

      return value + "<span style='margin-left:10px;'>(" + count + ' Spieler)</span>'
    }
  })
})
</script>

<template>
  <div id="example-table" class="table-borderless"></div>
</template>
