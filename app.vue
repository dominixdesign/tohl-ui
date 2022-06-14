<template>
  <div class="min-h-full">
    <Popover
      as="header"
      class="pb-24 bg-gradient-to-r from-primary-500 to-primary-700"
      v-slot="{ open }"
    >
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div class="relative py-5 flex items-center justify-center lg:justify-between">
          <!-- Logo -->
          <div class="absolute left-0 flex-shrink-0 lg:static">
            <NuxtLink to="/">
              <span class="sr-only">TOHL</span>
              <TOHLLogo class="h-8 w-auto" alt="TOHL Logo" />
            </NuxtLink>
          </div>

          <!-- Right section on desktop -->
          <div class="hidden lg:ml-4 lg:flex lg:items-center lg:pr-0.5">
            <button
              type="button"
              class="flex-shrink-0 p-1 text-primary-200 rounded-full hover:text-white hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <span class="sr-only">View notifications</span>
              <BellIcon class="h-6 w-6" aria-hidden="true" />
            </button>

            <!-- Profile dropdown -->
            <div v-if="!isLoggedIn" class="ml-4 relative flex-shrink-0">
              <button
                type="button"
                @click="() => setLoginModal(true)"
                class="bg-white rounded-full flex text-sm ring-2 ring-white ring-opacity-20 focus:outline-none focus:ring-opacity-100"
              >
                <span class="sr-only">Login</span>
                <img class="h-8 w-8 rounded-full" :src="`/teams/tohl.svg`" alt="" />
              </button>
            </div>
            <Menu v-else as="div" class="ml-4 relative flex-shrink-0">
              <div>
                <MenuButton
                  class="bg-white rounded-full flex text-sm ring-2 ring-white ring-opacity-20 focus:outline-none focus:ring-opacity-100"
                >
                  <span class="sr-only">Open user menu</span>
                  <img class="h-8 w-8 rounded-full" :src="`/teams/${loggedInTeam}.svg`" alt="" />
                </MenuButton>
              </div>
              <transition
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <MenuItems
                  class="origin-top-right z-40 absolute -right-2 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                    <a
                      :href="item.href"
                      :class="[
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700'
                      ]"
                      >{{ item.name }}</a
                    >
                  </MenuItem>
                  <MenuItem>
                    <span class="block px-4 py-2 text-sm text-gray-700" @click="logout"
                      >Logout</span
                    >
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>

          <!-- Search -->
          <div class="flex-1 min-w-0 px-12 lg:hidden">
            <div class="max-w-xs w-full mx-auto">
              <label for="desktop-search" class="sr-only">Search</label>
              <div class="relative text-white focus-within:text-gray-600">
                <div class="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                  <SearchIcon class="h-5 w-5" aria-hidden="true" />
                </div>
                <input
                  id="desktop-search"
                  class="block w-full bg-white bg-opacity-20 py-2 pl-10 pr-3 border border-transparent rounded-md leading-5 text-gray-900 placeholder-white focus:outline-none focus:bg-opacity-100 focus:border-transparent focus:placeholder-gray-500 focus:ring-0 sm:text-sm"
                  placeholder="Search"
                  type="search"
                  name="search"
                />
              </div>
            </div>
          </div>

          <!-- Menu button -->
          <div class="absolute right-0 flex-shrink-0 lg:hidden">
            <!-- Mobile menu button -->
            <button
              class="bg-transparent p-2 rounded-md inline-flex items-center justify-center text-primary-200 hover:text-white hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white"
              @click="offCanvas = true"
            >
              <span class="sr-only">Open main menu</span>
              <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
              <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
        <nav-main />
      </div>

      <nav-off-canvas-nav :isOpen="offCanvas" :closeNav="() => (offCanvas = false)" />
    </Popover>
    <main class="-mt-24 pb-8">
      <div class="max-w-5xl mx-auto px-1 sm:px-6 lg:max-w-7xl lg:px-8">
        <div class="grid grid-cols-1 gap-4 items-start rounded-lg bg-white overflow-hidden shadow">
          <layout-breadcrumbs />
          <div class="p-3 lg:p-6 !pt-1">
            <NuxtPage :key="`root-${$route.fullPath}`" />
          </div>
        </div>
      </div>
    </main>
    <modal :isOpen="loginModal" :closeModal="() => setLoginModal(false)">
      <form-login :submitAction="() => setLoginModal(false)" />
    </modal>
  </div>
</template>

<script setup>
import { useQuery } from '@vue/apollo-composable'
import { ref, computed, inject } from 'vue'
import gql from 'graphql-tag'
import { useMutation } from '@vue/apollo-composable'
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverOverlay,
  PopoverPanel,
  PopoverGroup,
  TransitionChild,
  TransitionRoot
} from '@headlessui/vue'
import { BellIcon, MenuIcon, XIcon, ChartBarIcon } from '@heroicons/vue/outline'
import { SearchIcon } from '@heroicons/vue/solid'
import { ChevronDownIcon } from '@heroicons/vue/solid'
import TOHLLogo from '~/assets/logo.svg?component'
import { useUserStore } from '~/stores/user'
import { useNavigation } from '~/stores/navigation'

const authService = inject('authService')

const navStore = useNavigation()
const userStore = useUserStore()
const loginModal = ref(false)
const offCanvas = ref(false)

const loggedInTeam = computed(() => userStore.getTeam || 'tohl')
const isLoggedIn = computed(() => userStore.isLoggedIn || false)

function setLoginModal(value) {
  loginModal.value = value
}

function logout() {
  authService.logout()
}

const { result } = await useQuery(
  gql`
    query availableSeasons {
      seasons
    }
  `
)

watch(result, ({ seasons }) => {
  navStore.setSeasons(seasons)
})

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com'
}
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', action: logout }
]
</script>
