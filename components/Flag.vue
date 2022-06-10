<template>
  <img :src="imgUrl" :alt="country.name" :title="country.name" />
</template>

<script setup>
import { isoCountry } from 'iso-country'
import { toRefs } from 'vue'

const props = defineProps({
  code: {
    type: String,
    default: 'bra'
  }
})
const { code, size } = toRefs(props)

const country = isoCountry(code.value) || {
  code: 'unknown',
  name: 'Unbekannt'
}

const imgUrl = `/flags/${country.code}.svg`
</script>
