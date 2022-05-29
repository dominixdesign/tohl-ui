<template>
  <div class="min-h-full flex flex-col justify-center pb-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md pb-6">
      <TOHLLogoFull class="mx-auto h-32 w-auto" alt="TOHL" />
    </div>
    <form v-on:submit.prevent="login" class="space-y-6">
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">
          E-Mail oder Username
        </label>
        <div class="mt-1">
          <input
            v-model="username"
            id="email"
            name="email"
            type="email"
            autocomplete="email"
            required=""
            class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label for="password" class="block text-sm font-medium text-gray-700"> Passwort </label>
        <div class="mt-1">
          <input
            v-model="password"
            id="password"
            name="password"
            type="password"
            autocomplete="current-password"
            required=""
            class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          />
        </div>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <input
            v-model="rememberme"
            id="remember-me"
            name="remember-me"
            type="checkbox"
            class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <label for="remember-me" class="ml-2 block text-sm text-gray-900">
            eingeloggt bleiben
          </label>
        </div>

        <div class="text-sm">
          <a href="#" class="font-medium text-primary-600 hover:text-primary-500">
            Forgot your password?
          </a>
        </div>
      </div>

      <div>
        <button
          type="submit"
          :disabled="loading"
          class="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <RefreshIcon v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5" aria-hidden="true" />
          <CheckIcon v-else class="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
          Einloggen
        </button>
      </div>
      <p v-if="error">Fehler beim anmelden</p>
    </form>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'
import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { RefreshIcon } from '@heroicons/vue/outline'
import { CheckIcon } from '@heroicons/vue/solid'

import TOHLLogoFull from '@/assets/logo-full.svg?component'

const props = defineProps({
  submitAction: Function
})

const authService = inject('authService')
const username = ref(null)
const password = ref(null)
const rememberme = ref(true)
const error = ref(false)
const {
  mutate: managerLogin,
  onDone,
  loading,
  onError
} = useMutation(gql`
  mutation managerLogin($username: String!, $password: String!, $refresh: Boolean) {
    login(username: $username, password: $password, refresh: $refresh) {
      access_token
      refresh_token
      manager {
        username
        team {
          teamid
        }
      }
    }
  }
`)

onError((e) => {
  console.log(e)
  error.value = true
})
onDone(({ data }) => {
  if (data.login.refresh_token) {
    window.localStorage.setItem('refresh_token', data.login.refresh_token)
  }
  authService.setToken(data.login.access_token, data.login.manager)
  props.submitAction && props.submitAction()
})

async function login() {
  error.value = false
  const credentials = {
    username: username.value,
    password: password.value,
    refresh: rememberme.value
  }
  managerLogin(credentials)
}
</script>
