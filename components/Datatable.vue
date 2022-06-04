<script setup>
import { TabulatorFull as Tabulator } from 'tabulator-tables'
import { ref, toRefs, watchEffect } from 'vue'

const datatable = ref(null)

const props = defineProps({
  tabledata: Array,
  columns: Array
})
const { tabledata, columns } = toRefs(props)

watchEffect(() => {
  if (datatable.value) {
    const columns2 = columns.value.map((c) => Object.assign({}, c))

    var table = new Tabulator(datatable.value, {
      data: structuredClone(tabledata.value),
      columns: columns2,
      groupBy: 'seasondata.pos',
      headerSortElement: '',
      layout: 'fitColumns',
      groupToggleElement: 'header',
      height: '90vh',
      responsiveLayout: true,
      resizableColumnFit: true,
      groupHeader: function (value, count) {
        return value + "<span style='margin-left:10px;'>(" + count + ' Spieler)</span>'
      }
    })
  }
})
</script>

<template>
  <div ref="datatable" class="table-borderless font-mono"></div>
</template>
