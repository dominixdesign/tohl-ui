<template>
  <layout-modals-modal :show="show" @close="close">
    <template v-slot:default="slotProps">
      <div class="block absolute top-0 right-0 pt-4 pr-4">
        <button
          type="button"
          class="
            bg-white
            rounded-md
            text-gray-400
            hover:text-gray-500
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
          "
          @click="slotProps.closemodal"
        >
          <span class="sr-only">Close</span>
          <!-- Heroicon name: outline/x -->
          <svg
            class="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div>
        <h3 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Manager Login</h3>
      </div>
      <form v-on:submit.prevent="login" class="mt-8 space-y-6">
        <input type="hidden" name="remember" value="true" />
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email-address" class="sr-only">E-Mail oder Username</label>
            <input
              id="email-address"
              v-model="username"
              name="email"
              type="text"
              autocomplete="email"
              required
              class="
                appearance-none
                rounded-none
                relative
                block
                w-full
                px-3
                py-2
                border border-gray-300
                placeholder-gray-500
                text-gray-900
                rounded-t-md
                focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10
                sm:text-sm
              "
              placeholder="E-Mail oder Username"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Passwort</label>
            <input
              id="password"
              v-model="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="
                appearance-none
                rounded-none
                relative
                block
                w-full
                px-3
                py-2
                border border-gray-300
                placeholder-gray-500
                text-gray-900
                rounded-b-md
                focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10
                sm:text-sm
              "
              placeholder="Passwort"
            />
          </div>
        </div>

        <div class="sm:flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              v-model="rememberme"
              name="remember-me"
              type="checkbox"
              class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">
              eingeloggt bleiben
            </label>
          </div>

          <div class="text-sm mt-4 sm:mt-0">
            <a href="#" class="font-medium text-primary-600 hover:text-primary-500">
              Passwort vergessen?
            </a>
          </div>
        </div>
        <layout-elements-alert v-if="error">
          <h3 class="text-sm font-medium text-red-800">Anmeldung fehlgeschlagen.</h3>
        </layout-elements-alert>
        <div>
          <button
            type="submit"
            class="
              group
              relative
              w-full
              flex
              justify-center
              py-2
              px-4
              border border-transparent
              text-sm
              font-medium
              rounded-md
              text-white
              bg-primary-600
              hover:bg-primary-700
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
            "
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <!-- Heroicon name: solid/lock-closed -->
              <svg
                class="h-5 w-5 text-primary-500 group-hover:text-primary-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            Einloggen
          </button>
        </div>
      </form>
    </template>
  </layout-modals-modal>
</template>

<script>
export default {
  name: 'ModalLogin',
  props: ['show'],
  data() {
    return {
      username: null,
      password: null,
      rememberme: true,
      error: false
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    async login() {
      this.error = false
      const credentials = {
        username: this.username,
        password: this.password,
        refresh: this.rememberme
      }
      try {
        await this.$authService.login(credentials)
        this.close()
      } catch (e) {
        this.error = true
      }
    }
  }
}
</script>
