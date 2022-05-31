<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <TransitionRoot as="template" :show="isOpen">
    <Dialog as="div" class="relative z-10" @close="closeNav">
      <TransitionChild
        as="template"
        enter="ease-in-out duration-500"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in-out duration-500"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <TransitionChild
              as="template"
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <DialogPanel class="pointer-events-auto w-screen max-w-md">
                <div class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div class="bg-primary-500 py-6 px-4 sm:px-6">
                    <div class="flex items-center justify-between">
                      <DialogTitle class="text-lg font-medium text-white">
                        Panel title
                      </DialogTitle>
                      <div class="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          class="rounded-md bg-primary-700 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                          @click="open = false"
                        >
                          <span class="sr-only">Close panel</span>
                          <XIcon class="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="relative mt-6 flex-1 px-4 sm:px-6">
                    <!-- Replace with your content -->
                    <ul class="divide-primary-50 divide-y">
                      <li v-for="nav in navigationStore.nav" :key="nav.title">
                        <router-link
                          :to="nav.path"
                          class="block px-3 py-2 text-base text-gray-800 uppercase hover:bg-gray-100 hover:text-gray-800"
                          >{{ nav.title }}</router-link
                        >
                        <ul v-if="nav.children" class="divide-gray-100 divide-y">
                          <li v-for="subnav in nav.children" :key="subnav.title">
                            <router-link
                              :to="subnav.path"
                              class="block px-3 py-2 text-base text-gray-700 hover:bg-gray-100 hover:text-gray-800"
                              >{{ subnav.title }}</router-link
                            >
                          </li>
                        </ul>
                      </li>
                    </ul>
                    <!-- /End replace -->
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { toRefs } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XIcon } from '@heroicons/vue/outline'
import { useNavigation } from '@/stores/navigation'

const navigationStore = useNavigation()

const props = defineProps({
  isOpen: Boolean,
  closeNav: Function
})
const { isOpen, closeNav } = toRefs(props)
</script>
