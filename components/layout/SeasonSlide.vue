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
        <div class="fixed inset-0 bg-primary-700 bg-opacity-75 transition-opacity" />
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
                <div class="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                  <div class="px-4 sm:px-6">
                    <div class="flex items-start justify-between">
                      <DialogTitle class="text-lg font-medium text-gray-900">
                        Saison auswählen
                      </DialogTitle>
                      <div class="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          @click="closeNav"
                        >
                          <span class="sr-only">Close panel</span>
                          <XIcon class="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="relative mt-6 flex-1 px-4 sm:px-6">
                    <!-- Replace with your content -->
                    <div class="absolute inset-0 px-4 sm:px-6">
                      <nav>
                        <div v-for="season in seasons" :key="season" class="mt-5 first:mt-0">
                          <p
                            class="text-gray-300 ml-2 w-full border-b-2 pb-2 border-gray-100 text-md uppercase font-normal"
                          >
                            {{ season }}
                          </p>
                          <!-- eslint-disable vue/no-use-v-if-with-v-for -->
                          <template v-for="(title, type) in types" :key="`${season}-${type}`">
                            <nuxt-link
                              v-if="availableSeasons.indexOf(season + type) >= 0"
                              class="mx-2 py-2 px-3 cursor-pointer block text-primary-500 hover:bg-gray-200 hover:border-gray-300 border-b border-gray-200"
                              :to="getLink(season + type)"
                            >
                              {{ title }}
                            </nuxt-link>
                          </template>
                          <!-- eslint-enable vue/no-use-v-if-with-v-for -->
                        </div>
                      </nav>
                    </div>
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
import { useNavigation } from '~/stores/navigation'

const route = useRoute()
const navStore = useNavigation()
const availableSeasons = computed(() => navStore.availableSeasons || [])
const seasons = ref([])

watch(
  availableSeasons,
  (newSeasons) => {
    seasons.value = Array.from(new Set(newSeasons.map((s) => s.substr(0, 6))))
  },
  { immediate: true }
)

const props = defineProps({
  isOpen: Boolean,
  closeNav: Function
})
const { isOpen, closeNav } = toRefs(props)

const types = { pre: 'Pre-Season', '': 'Hauptrunde', PLF: 'Playoffs' }

const getLink = (season) => {
  return route.fullPath.replace(`/TOHL${route.params.season}/`, `/${season}/`)
}
</script>
