<script setup>
import { TabulatorFull as Tabulator } from 'tabulator-tables'
import { ref, toRefs, watchEffect } from 'vue'

const datatable = ref(null)

const props = defineProps({
  tabledata: Array,
  columns: Array,
  options: {
    type: Object,
    default: () => ({})
  }
})
const { tabledata, columns, options } = toRefs(props)

watchEffect(() => {
  if (datatable.value) {
    const columns2 = columns.value.map((c) => Object.assign({}, c))
    const datatableOptions = Object.assign(
      {
        data: structuredClone(tabledata.value),
        columns: columns2,
        headerSortElement: '',
        layout: 'fitColumns',
        groupToggleElement: 'header',
        responsiveLayout: true,
        resizableColumnFit: true
      },
      options.value || {}
    )

    var table = new Tabulator(datatable.value, datatableOptions)
  }
})
</script>

<template>
  <div ref="datatable" class="table-borderless font-mono mt-3"></div>
</template>
