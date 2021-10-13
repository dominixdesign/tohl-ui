<template>
  <h3 class="font-bold text-2xl font-headline flex items-center">
    <team-logo-middle :teamid="currentTeam" />
    <team-name class="ml-2" :teamid="currentTeam" />
    <div>
      <div class="sm:hidden">
        <label for="tabs" class="sr-only">Select a tab</label>
        <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
        <select
          id="tabs"
          name="tabs"
          class="
            block
            w-full
            focus:ring-indigo-500 focus:border-indigo-500
            border-gray-300
            rounded-md
          "
        >
          <option>My Account</option>

          <option>Company</option>

          <option selected>Team Members</option>

          <option>Billing</option>
        </select>
      </div>
      <div class="hidden sm:block">
        <nav class="flex space-x-4" aria-label="Tabs">
          <!-- Current: "bg-gray-200 text-gray-800", Default: "text-gray-600 hover:text-gray-800" -->
          <a
            href="#"
            class="text-gray-600 hover:text-gray-800 px-3 py-2 font-medium text-sm rounded-md"
          >
            Roster
          </a>

          <a
            href="#"
            class="text-gray-600 hover:text-gray-800 px-3 py-2 font-medium text-sm rounded-md"
          >
            Lines
          </a>

          <a
            href="#"
            class="bg-gray-200 text-gray-800 px-3 py-2 font-medium text-sm rounded-md"
            aria-current="page"
          >
            Vitals
          </a>

          <a
            href="#"
            class="text-gray-600 hover:text-gray-800 px-3 py-2 font-medium text-sm rounded-md"
          >
            Finanzen
          </a>
        </nav>
      </div>
    </div>
  </h3>
</template>

<script>
export default {
  props: {
    currentTeam: String
  }
}
</script>
