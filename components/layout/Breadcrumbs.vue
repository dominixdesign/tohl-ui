<template>
  <nav class="bg-white border-b border-gray-200 flex" aria-label="Breadcrumb">
    <ol role="list" class="max-w-screen-xl w-full mx-auto px-4 flex space-x-4 sm:px-6 lg:px-8">
      <li class="flex">
        <div class="flex items-center">
          <a href="#" class="text-gray-400 hover:text-gray-500">
            <HomeIcon class="flex-shrink-0 h-5 w-5" aria-hidden="true" />
            <span class="sr-only">Home</span>
          </a>
        </div>
      </li>
      <li v-for="page in crumbs" :key="page.name" class="flex">
        <div class="flex items-center">
          <svg
            class="flex-shrink-0 w-6 h-full text-gray-200"
            viewBox="0 0 24 44"
            preserveAspectRatio="none"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
          </svg>
          <NuxtLink
            :to="page.path"
            class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
            :aria-current="page.current ? 'page' : undefined"
            >{{ page.name || page.path }}</NuxtLink
          >
        </div>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { createRouterMatcher, START_LOCATION } from 'vue-router'
import { HomeIcon } from '@heroicons/vue/solid'

const route = useRoute()
const router = useRouter()

const matcher = createRouterMatcher([], {
  strict: false,
  sensitive: false
})

const matchRoute = (path) => {
  // resolve can fail with invalid keys
  try {
    return matcher.resolve({ path }, START_LOCATION)
  } catch (err) {}
}

const crumbs = computed(() => {
  const fullPath = route.fullPath
  const params = fullPath.startsWith('/') ? fullPath.substring(1).split('/') : fullPath.split('/')
  const crumbs = []
  let path = ''
  params.forEach((param, index) => {
    path = `${path}/${param}`
    const match = matchRoute(path)
    if (match.name !== null) {
      crumbs.push({
        ...match
      })
    }
  })
  console.log(crumbs)
  return crumbs
})

const pages = [
  { name: 'Projects', href: '#', current: false },
  { name: 'Project Nero', href: '#', current: true }
]
</script>
