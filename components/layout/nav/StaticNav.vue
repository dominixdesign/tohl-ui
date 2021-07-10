<template>
  <!-- Static sidebar for desktop -->
  <div
    class="
      hidden
      bg-dizzle-light
      dark:bg-dizzle
      lg:flex lg:flex-shrink-0
      shadow
      border-r border-gray-700
    "
  >
    <div class="flex flex-col w-80">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
        <div class="flex items-center flex-shrink-0 px-4">
          <layout-logo class="h-16 m-auto my-6" />
        </div>
        <div class="mt-5 flex-1 flex flex-col">
          <layout-nav-inner />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StaticNav'
}
</script>
