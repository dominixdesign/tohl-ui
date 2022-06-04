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
        <div class="hidden lg:block border-t border-white border-opacity-20 py-5">
          <div class="grid grid-cols-3 gap-8 items-center">
            <PopoverGroup as="nav" class="flex space-x-10 col-span-2">
              <Popover class="relative" v-slot="{ open }">
                <PopoverButton
                  :class="[
                    open ? 'text-gray-900' : 'text-gray-200',
                    'group rounded-md inline-flex items-center text-base font-medium hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-300'
                  ]"
                >
                  <span>Solutions</span>
                  <ChevronDownIcon
                    :class="[
                      open ? 'text-gray-600' : 'text-gray-400',
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
                    class="absolute z-10 -ml-4 mt-3 transform w-screen max-w-md lg:max-w-3xl"
                  >
                    <div
                      class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden"
                    >
                      <div
                        class="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8 lg:grid-cols-2"
                      >
                        <a
                          v-for="item in solutions"
                          :key="item.name"
                          :href="item.href"
                          class="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                        >
                          <div
                            class="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white sm:h-12 sm:w-12"
                          >
                            <component :is="item.icon" class="h-6 w-6" aria-hidden="true" />
                          </div>
                          <div class="ml-4">
                            <p class="text-base font-medium text-gray-900">
                              {{ item.name }}
                            </p>
                            <p class="mt-1 text-sm text-gray-500">
                              {{ item.description }}
                            </p>
                          </div>
                        </a>
                      </div>
                      <div class="p-5 bg-gray-50 sm:p-8">
                        <a href="#" class="-m-3 p-3 flow-root rounded-md hover:bg-gray-100">
                          <div class="flex items-center">
                            <div class="text-base font-medium text-gray-900">Enterprise</div>
                            <span
                              class="ml-3 inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium leading-5 bg-indigo-100 text-indigo-800"
                            >
                              New
                            </span>
                          </div>
                          <p class="mt-1 text-sm text-gray-500">
                            Empower your entire team with even more advanced tools.
                          </p>
                        </a>
                      </div>
                    </div>
                  </PopoverPanel>
                </transition>
              </Popover>
              <NuxtLink to="/about" class="text-base font-medium text-gray-300 hover:text-gray-100">
                About
              </NuxtLink>
              <NuxtLink
                to="/TOHL13pre/teams"
                class="text-base font-medium text-gray-300 hover:text-gray-100"
              >
                Teams
              </NuxtLink>

              <Popover class="relative" v-slot="{ open }">
                <PopoverButton
                  :class="[
                    open ? 'text-gray-100' : 'text-gray-300',
                    'group rounded-md inline-flex items-center text-base font-medium hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-300'
                  ]"
                >
                  <span>More</span>
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
                    <div
                      class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden"
                    >
                      <div class="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                        <a
                          v-for="item in resources"
                          :key="item.name"
                          :href="item.href"
                          class="-m-3 p-3 block rounded-md hover:bg-gray-50"
                        >
                          <p class="text-base font-medium text-gray-900">
                            {{ item.name }}
                          </p>
                          <p class="mt-1 text-sm text-gray-500">
                            {{ item.description }}
                          </p>
                        </a>
                      </div>
                    </div>
                  </PopoverPanel>
                </transition>
              </Popover>
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
      </div>

      <nav-off-canvas-nav :isOpen="offCanvas" :closeNav="() => (offCanvas = false)" />
    </Popover>
    <main class="-mt-24 pb-8">
      <div class="max-w-3xl mx-auto px-1 sm:px-6 lg:max-w-7xl lg:px-8">
        <div class="grid grid-cols-1 gap-4 items-start rounded-lg bg-white overflow-hidden shadow">
          <div class="p-3 lg:p-6">
            <NuxtPage />
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
import { ref, computed, inject } from 'vue'
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

const authService = inject('authService')

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

const solutions = [
  {
    name: 'Blog',
    description: 'Learn about tips, product updates and company culture.',
    href: '#',
    icon: ChartBarIcon
  },
  {
    name: 'Help Center',
    description: 'Get all of your questions answered in our forums of contact support.',
    href: '#',
    icon: ChartBarIcon
  },
  {
    name: 'Guides',
    description: 'Learn how to maximize our platform to get the most out of it.',
    href: '#',
    icon: ChartBarIcon
  },
  {
    name: 'Events',
    description: 'Check out webinars with experts and learn about our annual conference.',
    href: '#',
    icon: ChartBarIcon
  },
  {
    name: 'Security',
    description: 'Understand how we take your privacy seriously.',
    href: '#',
    icon: ChartBarIcon
  }
]

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com'
}
const resources = [
  { name: 'Home', href: '#', current: true },
  { name: 'Profile', href: '#', current: false },
  { name: 'Resources', href: '#', current: false },
  { name: 'Company Directory', href: '#', current: false },
  { name: 'Openings', href: '#', current: false }
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', action: logout }
]
</script>
