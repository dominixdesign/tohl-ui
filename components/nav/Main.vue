<template>
  <div class="hidden lg:block border-t border-white border-opacity-20 py-5">
    <div class="grid grid-cols-3 gap-8 items-center">
      <PopoverGroup as="nav" class="flex space-x-10 col-span-2">
        <nav-main-entry
          v-for="nav in navigationStore.nav"
          :key="nav.title"
          :title="nav.title"
          :path="nav.path"
          :children="nav.children"
        />
      </PopoverGroup>
      <div>
        <div class="max-w-md w-full mx-auto">
          <label for="mobile-search" class="sr-only">Search</label>
          <div class="relative text-white focus-within:text-gray-600">
            <div class="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
              <SearchIcon class="h-5 w-5" aria-hidden="true" />
            </div>
            <input
              id="mobile-search"
              class="block w-full bg-white bg-opacity-20 py-2 pl-10 pr-3 border border-transparent rounded-md leading-5 text-gray-900 placeholder-white focus:outline-none focus:bg-opacity-100 focus:border-transparent focus:placeholder-gray-500 focus:ring-0 sm:text-sm"
              placeholder="Search"
              type="search"
              name="search"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  PopoverGroup,
  TransitionChild,
  TransitionRoot
} from '@headlessui/vue'
import { SearchIcon } from '@heroicons/vue/solid'
import { useNavigation } from '~/stores/navigation'

const navigationStore = useNavigation()
</script>
