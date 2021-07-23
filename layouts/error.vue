<template>
  <div
    class="px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8"
  >
    <div class="max-w-max mx-auto">
      <main class="sm:flex">
        <p class="text-4xl font-extrabold text-secondary-500 sm:text-5xl">
          {{ error.statusCode }}
        </p>
        <div class="sm:ml-6">
          <div class="sm:border-l sm:border-gray-200 sm:pl-6">
            <h1
              class="
                text-4xl
                font-extrabold
                text-gray-200
                tracking-tight
                sm:text-5xl
              "
            >
              {{ error.message }}
            </h1>
            <p class="mt-1 text-base text-gray-500" v-if="error.sub">
              {{ error.sub }}
            </p>
          </div>
          <div
            class="
              mt-10
              flex
              space-x-3
              sm:border-l sm:border-transparent sm:pl-6
            "
          >
            <NuxtLink
              to="/"
              class="
                inline-flex
                items-center
                px-4
                py-2
                border border-transparent
                text-sm
                font-medium
                rounded-md
                shadow-sm
                text-white
                bg-primary-500
                hover:bg-primary-300
                focus:outline-none
                focus:ring-2
                focus:ring-offset-2
                focus:ring-primary-500
              "
            >
              Zur Startseite
            </NuxtLink>
            <button
              @click="loginModal = true"
              v-if="error.statusCode === 403"
              class="
                inline-flex
                items-center
                px-4
                py-2
                border border-transparent
                text-sm
                font-medium
                rounded-md
                shadow-sm
                text-white
                bg-secondary-500
                hover:bg-secondary-300
                focus:outline-none
                focus:ring-2
                focus:ring-offset-2
                focus:ring-secondary-500
              "
            >
              Login
            </button>
            <layout-modals-login
              :show="loginModal"
              @close="loginModal = false"
            />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  props: ['error'],
  data() {
    return {
      loginModal: false
    }
  }
}
</script>
