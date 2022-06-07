<template>
  <NuxtLink
    v-if="(children && children.length === 0) || !children"
    :to="getPath(path)"
    class="text-base font-medium text-gray-300 hover:text-gray-100"
  >
    {{ title }}
  </NuxtLink>
  <Popover v-else class="relative" v-slot="{ open }">
    <PopoverButton
      :class="[
        open ? 'text-gray-100' : 'text-gray-300',
        'group rounded-md inline-flex items-center text-base font-medium hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-300'
      ]"
    >
      <span>{{ title }}</span>
      <ChevronDownIcon
        :class="[
          open ? 'text-gray-100' : 'text-gray-300',
          'ml-2 h-5 w-5 group-hover:text-gray-100'
        ]"
        aria-hidden="true"
      />
    </PopoverButton>

    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-1"
    >
      <PopoverPanel
        class="absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-xs sm:px-0"
      >
        <div class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
          <div class="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
            <NuxtLink
              v-for="child in children"
              :key="child.title"
              :to="getPath(child.path)"
              class="-m-3 p-3 block rounded-md hover:bg-gray-50"
            >
              <p class="text-base font-medium text-gray-900">
                {{ child.title }}
              </p>
              <p class="mt-1 text-sm text-gray-500">
                {{ child.description }}
              </p>
            </NuxtLink>
          </div>
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
</template>
<script setup>
import { template } from 'lodash-es'
import { Popover, PopoverButton, PopoverOverlay, PopoverPanel, PopoverGroup } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/solid'
import { useNavigation } from '~/stores/navigation'

const navigationStore = useNavigation()

const props = defineProps({
  title: String,
  path: String,
  children: Array
})
const { title, path, children } = toRefs(props)
const getPath = (path) => {
  const compiled = template(path)
  return compiled({ season: navigationStore.getSeason })
}
</script>
