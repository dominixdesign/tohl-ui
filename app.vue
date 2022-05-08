<!--
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  const colors = require('tailwindcss/colors')
  
  module.exports = {
    // ...
    theme: {
      extend: {
        colors: {
          sky: colors.sky,
          teal: colors.teal,
          cyan: colors.cyan,
          rose: colors.rose,
        },
      },
    },
    plugins: [
      // ...
      require('@tailwindcss/forms'),
      require('@tailwindcss/line-clamp'),
    ],
  }
  ```
-->
<template>
  <!--
    This example requires updating your template:

    ```
    <html class="h-full bg-gray-100">
    <body class="h-full">
    ```
  -->
  <div class="min-h-full">
    <Popover
      as="header"
      class="pb-24 bg-gradient-to-r from-primary-800 to-primary-600"
      v-slot="{ open }"
    >
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div
          class="relative flex flex-wrap items-center justify-center lg:justify-between"
        >
          <!-- Logo -->
          <div class="absolute left-0 py-5 flex-shrink-0 lg:static">
            <a href="#">
              <span class="sr-only">Workflow</span>
              <!-- https://tailwindui.com/img/logos/workflow-mark-cyan-200.svg -->
              <svg
                version="1.1"
                id="Layer_1"
                class="h-8 fill-white transform scale-150"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="-20.198 60.883 535.844 239.586"
                enable-background="new -20.198 60.883 535.844 239.586"
                xml:space="preserve"
              >
                <g>
                  <path
                    d="M268.826,203.476l26.601-63.556h25.726l-28.772,68.745c1.965,0.343,3.963,0.69,6.004,1.044h42.385
		l61.234-146.958h-48.682l-21.525,51.416h-25.727l21.383-51.416h-48.682l-52.545,126.102
		C240.942,194.531,256.463,199.902,268.826,203.476z"
                  />
                  <path
                    d="M440.13,209.709c5.549-2.156,10.844-4.71,15.303-7.359l7.806-18.394h-48.683l50.353-121.205h-48.682
		l-61.235,146.958H440.13z"
                  />
                  <path
                    d="M121.029,97.66l-19.13,45.874c14.871,0.069,30.79,2.893,45.519,7.812l20.862-50.01
		c2.243-5.206,5.203-8.973,8.877-11.331c3.723-2.358,7.589-3.552,11.694-3.552c1.957,0.061,3.675,0.429,5.106,1.133
		c1.432,0.674,2.53,1.623,3.293,2.817c0.716,1.194,1.193,2.633,1.384,4.287c0,1.685-0.477,3.798-1.384,6.309l-25.528,61.071
		c3.185,1.814,6.214,3.732,9.037,5.754c5.166,3.701,16.261,9.045,29.551,14.629c2.036-2.486,3.603-5.035,4.694-7.654L247.03,97.66
		c1.289-3.093,1.957-6.246,1.957-9.432c0-5.726-2.386-10.687-7.111-14.82c-4.772-4.165-10.93-7.289-18.471-9.371
		c-7.541-2.113-15.512-3.154-23.912-3.154c-12.123,0-23.769,1.775-34.889,5.298c-11.168,3.522-20.571,8.146-28.255,13.903
		C128.666,85.81,123.559,91.69,121.029,97.66z"
                  />
                  <polygon
                    points="118.269,88.413 128.912,62.751 0.631,62.751 -10.012,88.413 30.441,88.413 -20.198,209.709 
		28.484,209.709 79.124,88.413 	"
                  />
                  <path
                    d="M176.277,228.348c3.289-0.499,5.495-1.271,7.266-2.813c-32.673,4.965-94.69-21.17-98.804-48.249
		c-0.861-5.663,2.266-9.607,4.907-12.714c-7.45,1.302-14.241,7.549-13.136,14.819l0.127,0.835
		c3.896,25.641,63.779,53.571,90.449,49.52L176.277,228.348z"
                  />
                  <path
                    d="M493.908,124.518c4.54,29.882,0.976,46.566-11.86,63.996c-6.652,9.034-11.035,14.152-20.816,21.04
		c-3.467,2.442-27.256,15.529-27.271,15.546c11.624-1.766,30.815-10.108,39.11-14.993c15.494-9.125,16.365-11.092,24.965-24.664
		c1.129,16.643-23.228,40.677-34.6,50.226c-7.752,6.511-17.414,12.912-26.536,18.313c-3.972,2.352-27.548,14.817-28.598,16.053
		c25.265-3.839,63.302-20.624,77.622-32.653C517.214,211.098,529.703,154.942,493.908,124.518z"
                  />
                  <path
                    d="M363.868,287.043c-21.359,3.246-84.262,1.448-94.836-5.252c3.561-0.461,19.674-0.02,25.148,0.112
		c6.814,0.165,20.02-1.846,27.42-2.971l14.205-2.158c33.484-5.088,99.123-21.738,108.289-41.246l-35.938,10.471
		c-17.424,4.025-72.438,0.841-86.357-1.61c-14.594-2.569-66.238-10.748-73.101-17.641c6.3-0.814,27.03,1.463,35.937,1.59
		c11.604,0.164,24.03,1.087,36.286,1.113c22.788,0.051,50.96,0.807,75.638-2.943c-0.119-0.788-69.076-4.152-83.453-5.682
		c-0.6-0.062-1.117-0.123-1.547-0.187c-0.158-0.022-0.303-0.046-0.428-0.067c-27.089-4.726-50.158-10.328-74.734-18.444
		c-21.96-7.252-47.49-19.062-65.711-31.709c-13.347-9.265-51.651-23.137-73.753-19.778l-15.041,2.285
		c-19.523,2.967-35.137,38.814-32.491,56.23c5.553,36.545,87.618,65.6,119.154,73.027c22.723,5.353,50.356,13.688,74.83,15.291
		c39.151,2.565,131.951,10.672,162.844-18.577l-18.881,4.919L363.868,287.043z M304.73,252.453
		c18.356,2.195,32.955,2.504,53.168,3.385c19.26,0.838,38.263-3.622,58.347-6.674c-4.034,4.746-40.93,13.913-52.336,15.646
		l-18.383,2.794c-29.799,4.527-56.121,4.716-82.172,3.754c-12.561-0.464-60.703-9.01-69.719-13.161
		c23.121-1.569,45.625,3.326,69.207-0.257c-17.405-3.599-35.279-12.594-53.543-26.061c3.653,0.287,18.665,4.983,23.487,6.404
		c7.704,2.269,15.424,3.668,23.372,5.551C270.666,247.27,289.753,250.662,304.73,252.453z M310.005,225.126
		c-11.083,1.433-37.826-1.313-49.436-2.405c-7.688-0.723-15.721-1.694-23.086-2.914c-6.348-1.052-19.676-3.809-25.442-4.251
		c-0.042-8.409-0.422-8.632-3.388-16.063c17.02,7.997,28.548,11.319,48.33,16.005C265.505,217.517,306.586,223.448,310.005,225.126z
		 M212.996,225.073L212.996,225.073L212.996,225.073L212.996,225.073z M57.176,209.685l-0.889-5.85
		c-0.934-6.146,6.822-19.766,9.185-25.149c0.221-0.503,0.443-1.008,0.668-1.514c0.226-0.506,0.455-1.013,0.689-1.518
		c3.278-7.072,7.569-13.896,17.877-15.462l14.205-2.159c0.461-0.07,0.931-0.131,1.409-0.185c1.434-0.161,2.942-0.247,4.516-0.264
		c10.388-0.111,23.594,2.831,36.761,7.714c8.101,3.004,16.187,6.741,23.593,10.959c10.33,5.882,19.336,12.693,25.213,19.732
		c0.321,0.384,0.629,0.77,0.931,1.154c0.999,1.276,1.896,2.559,2.673,3.844c1.772,2.927,2.941,5.864,3.382,8.764l0.762,5.014
		c0.73,4.807-7.904,21.932-10.139,26.674c-4.104,8.707-8.941,16.405-21.496,18.313l-5.849,0.888
		C128.334,265.554,61.409,237.544,57.176,209.685z M164.824,271.123c6.234-0.947,18.676-4.264,22.18-5.162
		c46.52,14.496,88.36,28.934,171.245,25.927C275.688,303.818,193.871,286.562,164.824,271.123z"
                  />
                </g>
              </svg>
            </a>
          </div>

          <!-- Right section on desktop -->
          <div class="hidden lg:ml-4 lg:flex lg:items-center lg:py-5 lg:pr-0.5">
            <button
              type="button"
              class="flex-shrink-0 p-1 text-cyan-200 rounded-full hover:text-white hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <span class="sr-only">View notifications</span>
              <BellIcon class="h-6 w-6" aria-hidden="true" />
            </button>

            <!-- Profile dropdown -->
            <Menu as="div" class="ml-4 relative flex-shrink-0">
              <div>
                <MenuButton
                  class="bg-white rounded-full flex text-sm ring-2 ring-white ring-opacity-20 focus:outline-none focus:ring-opacity-100"
                >
                  <span class="sr-only">Open user menu</span>
                  <img
                    class="h-8 w-8 rounded-full"
                    :src="user.imageUrl"
                    alt=""
                  />
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
                  <MenuItem
                    v-for="item in userNavigation"
                    :key="item.name"
                    v-slot="{ active }"
                  >
                    <a
                      :href="item.href"
                      :class="[
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700',
                      ]"
                      >{{ item.name }}</a
                    >
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>

          <div
            class="w-full py-5 lg:border-t lg:border-white lg:border-opacity-20"
          >
            <div class="lg:grid lg:grid-cols-3 lg:gap-8 lg:items-center">
              <!-- Left nav -->
              <div class="hidden lg:block lg:col-span-2">
                <nav class="flex space-x-4">
                  <a
                    v-for="item in navigation"
                    :key="item.name"
                    :href="item.href"
                    :class="[
                      item.current ? 'text-white' : 'text-cyan-100',
                      'text-sm font-medium rounded-md bg-white bg-opacity-0 px-3 py-2 hover:bg-opacity-10',
                    ]"
                    :aria-current="item.current ? 'page' : undefined"
                  >
                    {{ item.name }}
                  </a>
                </nav>
              </div>
              <div class="px-12 lg:px-0">
                <!-- Search -->
                <div class="max-w-xs mx-auto w-full lg:max-w-md">
                  <label for="search" class="sr-only">Search</label>
                  <div class="relative text-white focus-within:text-gray-600">
                    <div
                      class="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center"
                    >
                      <SearchIcon class="h-5 w-5" aria-hidden="true" />
                    </div>
                    <input
                      id="search"
                      class="block w-full text-white bg-white bg-opacity-20 py-2 pl-10 pr-3 border border-transparent rounded-md leading-5 focus:text-gray-900 placeholder-white focus:outline-none focus:bg-opacity-100 focus:border-transparent focus:placeholder-gray-500 focus:ring-0 sm:text-sm"
                      placeholder="Search"
                      type="search"
                      name="search"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Menu button -->
          <div class="absolute right-0 flex-shrink-0 lg:hidden">
            <!-- Mobile menu button -->
            <PopoverButton
              class="bg-transparent p-2 rounded-md inline-flex items-center justify-center text-cyan-200 hover:text-white hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <span class="sr-only">Open main menu</span>
              <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
              <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </PopoverButton>
          </div>
        </div>
      </div>

      <TransitionRoot as="template" :show="open">
        <div class="lg:hidden">
          <TransitionChild
            as="template"
            enter="duration-150 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-150 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <PopoverOverlay class="z-20 fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>

          <TransitionChild
            as="template"
            enter="duration-150 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-150 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <PopoverPanel
              focus
              class="z-30 absolute top-0 inset-x-0 max-w-3xl mx-auto w-full p-2 transition transform origin-top"
            >
              <div
                class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y divide-gray-200"
              >
                <div class="pt-3 pb-2">
                  <div class="flex items-center justify-between px-4">
                    <div>
                      <img
                        class="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark-cyan-600.svg"
                        alt="Workflow"
                      />
                    </div>
                    <div class="-mr-2">
                      <PopoverButton
                        class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500"
                      >
                        <span class="sr-only">Close menu</span>
                        <XIcon class="h-6 w-6" aria-hidden="true" />
                      </PopoverButton>
                    </div>
                  </div>
                  <div class="mt-3 px-2 space-y-1">
                    <a
                      v-for="item in navigation"
                      :key="item.name"
                      :href="item.href"
                      class="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                      >{{ item.name }}</a
                    >
                  </div>
                </div>
                <div class="pt-4 pb-2">
                  <div class="flex items-center px-5">
                    <div class="flex-shrink-0">
                      <img
                        class="h-10 w-10 rounded-full"
                        :src="user.imageUrl"
                        alt=""
                      />
                    </div>
                    <div class="ml-3 min-w-0 flex-1">
                      <div class="text-base font-medium text-gray-800 truncate">
                        {{ user.name }}
                      </div>
                      <div class="text-sm font-medium text-gray-500 truncate">
                        {{ user.email }}
                      </div>
                    </div>
                    <button
                      type="button"
                      class="ml-auto flex-shrink-0 bg-white p-1 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                    >
                      <span class="sr-only">View notifications</span>
                      <BellIcon class="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div class="mt-3 px-2 space-y-1">
                    <a
                      v-for="item in userNavigation"
                      :key="item.name"
                      :href="item.href"
                      class="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                      >{{ item.name }}</a
                    >
                  </div>
                </div>
              </div>
            </PopoverPanel>
          </TransitionChild>
        </div>
      </TransitionRoot>
    </Popover>
    <main class="-mt-24 pb-8">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 class="sr-only">Profile</h1>
        <!-- Main 3 column grid -->
        <div class="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
          <!-- Left column -->
          <div class="grid grid-cols-1 gap-4 lg:col-span-2">
            <!-- Welcome panel -->
            <section aria-labelledby="profile-overview-title">
              <div class="rounded-lg bg-white overflow-hidden shadow">
                <h2 class="sr-only" id="profile-overview-title">
                  Profile Overview
                </h2>
                <div class="bg-white p-6">
                  <div class="sm:flex sm:items-center sm:justify-between">
                    <div class="sm:flex sm:space-x-5">
                      <div class="flex-shrink-0">
                        <img
                          class="mx-auto h-20 w-20 rounded-full"
                          :src="user.imageUrl"
                          alt=""
                        />
                      </div>
                      <div
                        class="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left"
                      >
                        <p class="text-sm font-medium text-gray-600">
                          Welcome back,
                        </p>
                        <p class="text-xl font-bold text-gray-900 sm:text-2xl">
                          {{ user.name }}
                        </p>
                        <p class="text-sm font-medium text-gray-600">
                          {{ user.role }}
                        </p>
                      </div>
                    </div>
                    <div class="mt-5 flex justify-center sm:mt-0">
                      <a
                        href="#"
                        class="flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        View profile
                      </a>
                    </div>
                  </div>
                </div>
                <div
                  class="border-t border-gray-200 bg-gray-50 grid grid-cols-1 divide-y divide-gray-200 sm:grid-cols-3 sm:divide-y-0 sm:divide-x"
                >
                  <div
                    v-for="stat in stats"
                    :key="stat.label"
                    class="px-6 py-5 text-sm font-medium text-center"
                  >
                    <span class="text-gray-900">{{ stat.value }}</span>
                    {{ " " }}
                    <span class="text-gray-600">{{ stat.label }}</span>
                  </div>
                </div>
              </div>
            </section>

            <!-- Actions panel -->
            <section aria-labelledby="quick-links-title">
              <div
                class="rounded-lg bg-gray-200 overflow-hidden shadow divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-px"
              >
                <h2 class="sr-only" id="quick-links-title">Quick links</h2>
                <div
                  v-for="(action, actionIdx) in actions"
                  :key="action.name"
                  :class="[
                    actionIdx === 0
                      ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none'
                      : '',
                    actionIdx === 1 ? 'sm:rounded-tr-lg' : '',
                    actionIdx === actions.length - 2 ? 'sm:rounded-bl-lg' : '',
                    actionIdx === actions.length - 1
                      ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none'
                      : '',
                    'relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-cyan-500',
                  ]"
                >
                  <div>
                    <span
                      :class="[
                        action.iconBackground,
                        action.iconForeground,
                        'rounded-lg inline-flex p-3 ring-4 ring-white',
                      ]"
                    >
                      <component
                        :is="action.icon"
                        class="h-6 w-6"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                  <div class="mt-8">
                    <h3 class="text-lg font-medium">
                      <a :href="action.href" class="focus:outline-none">
                        <!-- Extend touch target to entire panel -->
                        <span class="absolute inset-0" aria-hidden="true" />
                        {{ action.name }}
                      </a>
                    </h3>
                    <p class="mt-2 text-sm text-gray-500">
                      Doloribus dolores nostrum quia qui natus officia quod et
                      dolorem. Sit repellendus qui ut at blanditiis et quo et
                      molestiae.
                    </p>
                  </div>
                  <span
                    class="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                    aria-hidden="true"
                  >
                    <svg
                      class="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </section>
          </div>

          <!-- Right column -->
          <div class="grid grid-cols-1 gap-4">
            <!-- Announcements -->
            <section aria-labelledby="announcements-title">
              <div class="rounded-lg bg-white overflow-hidden shadow">
                <div class="p-6">
                  <h2
                    class="text-base font-medium text-gray-900"
                    id="announcements-title"
                  >
                    Announcements
                  </h2>
                  <div class="flow-root mt-6">
                    <ul role="list" class="-my-5 divide-y divide-gray-200">
                      <li
                        v-for="announcement in announcements"
                        :key="announcement.id"
                        class="py-5"
                      >
                        <div
                          class="relative focus-within:ring-2 focus-within:ring-cyan-500"
                        >
                          <h3 class="text-sm font-semibold text-gray-800">
                            <a
                              :href="announcement.href"
                              class="hover:underline focus:outline-none"
                            >
                              <!-- Extend touch target to entire panel -->
                              <span
                                class="absolute inset-0"
                                aria-hidden="true"
                              />
                              {{ announcement.title }}
                            </a>
                          </h3>
                          <p class="mt-1 text-sm text-gray-600 line-clamp-2">
                            {{ announcement.preview }}
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="mt-6">
                    <a
                      href="#"
                      class="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      View all
                    </a>
                  </div>
                </div>
              </div>
            </section>

            <!-- Recent Hires -->
            <section aria-labelledby="recent-hires-title">
              <div class="rounded-lg bg-white overflow-hidden shadow">
                <div class="p-6">
                  <h2
                    class="text-base font-medium text-gray-900"
                    id="recent-hires-title"
                  >
                    Recent Hires
                  </h2>
                  <div class="flow-root mt-6">
                    <ul role="list" class="-my-5 divide-y divide-gray-200">
                      <li
                        v-for="person in recentHires"
                        :key="person.handle"
                        class="py-4"
                      >
                        <div class="flex items-center space-x-4">
                          <div class="flex-shrink-0">
                            <img
                              class="h-8 w-8 rounded-full"
                              :src="person.imageUrl"
                              alt=""
                            />
                          </div>
                          <div class="flex-1 min-w-0">
                            <p
                              class="text-sm font-medium text-gray-900 truncate"
                            >
                              {{ person.name }}
                            </p>
                            <p class="text-sm text-gray-500 truncate">
                              {{ "@" + person.handle }}
                            </p>
                          </div>
                          <div>
                            <a
                              :href="person.href"
                              class="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
                            >
                              View
                            </a>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="mt-6">
                    <a
                      href="#"
                      class="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      View all
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
    <footer>
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
        <div
          class="border-t border-gray-200 py-8 text-sm text-gray-500 text-center sm:text-left"
        >
          <span class="block sm:inline">&copy; 2021 Tailwind Labs Inc.</span>
          <span class="block sm:inline">All rights reserved.</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverOverlay,
  PopoverPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import {
  AcademicCapIcon,
  BadgeCheckIcon,
  BellIcon,
  CashIcon,
  ClockIcon,
  MenuIcon,
  ReceiptRefundIcon,
  UsersIcon,
  XIcon,
} from "@heroicons/vue/outline";
import { SearchIcon } from "@heroicons/vue/solid";

const user = {
  name: "Chelsea Hagon",
  email: "chelsea.hagon@example.com",
  role: "Human Resources Manager",
  imageUrl:
    "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  { name: "Home", href: "#", current: true },
  { name: "Profile", href: "#", current: false },
  { name: "Resources", href: "#", current: false },
  { name: "Company Directory", href: "#", current: false },
  { name: "Openings", href: "#", current: false },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];
const stats = [
  { label: "Vacation days left", value: 12 },
  { label: "Sick days left", value: 4 },
  { label: "Personal days left", value: 2 },
];
const actions = [
  {
    icon: ClockIcon,
    name: "Request time off",
    href: "#",
    iconForeground: "text-teal-700",
    iconBackground: "bg-teal-50",
  },
  {
    icon: BadgeCheckIcon,
    name: "Benefits",
    href: "#",
    iconForeground: "text-purple-700",
    iconBackground: "bg-purple-50",
  },
  {
    icon: UsersIcon,
    name: "Schedule a one-on-one",
    href: "#",
    iconForeground: "text-sky-700",
    iconBackground: "bg-sky-50",
  },
  {
    icon: CashIcon,
    name: "Payroll",
    href: "#",
    iconForeground: "text-yellow-700",
    iconBackground: "bg-yellow-50",
  },
  {
    icon: ReceiptRefundIcon,
    name: "Submit an expense",
    href: "#",
    iconForeground: "text-rose-700",
    iconBackground: "bg-rose-50",
  },
  {
    icon: AcademicCapIcon,
    name: "Training",
    href: "#",
    iconForeground: "text-indigo-700",
    iconBackground: "bg-indigo-50",
  },
];
const recentHires = [
  {
    name: "Leonard Krasner",
    handle: "leonardkrasner",
    imageUrl:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    href: "#",
  },
  {
    name: "Floyd Miles",
    handle: "floydmiles",
    imageUrl:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    href: "#",
  },
  {
    name: "Emily Selman",
    handle: "emilyselman",
    imageUrl:
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    href: "#",
  },
  {
    name: "Kristin Watson",
    handle: "kristinwatson",
    imageUrl:
      "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    href: "#",
  },
];
const announcements = [
  {
    id: 1,
    title: "Office closed on July 2nd",
    href: "#",
    preview:
      "Cum qui rem deleniti. Suscipit in dolor veritatis sequi aut. Vero ut earum quis deleniti. Ut a sunt eum cum ut repudiandae possimus. Nihil ex tempora neque cum consectetur dolores.",
  },
  {
    id: 2,
    title: "New password policy",
    href: "#",
    preview:
      "Alias inventore ut autem optio voluptas et repellendus. Facere totam quaerat quam quo laudantium cumque eaque excepturi vel. Accusamus maxime ipsam reprehenderit rerum id repellendus rerum. Culpa cum vel natus. Est sit autem mollitia.",
  },
  {
    id: 3,
    title: "Office closed on July 2nd",
    href: "#",
    preview:
      "Tenetur libero voluptatem rerum occaecati qui est molestiae exercitationem. Voluptate quisquam iure assumenda consequatur ex et recusandae. Alias consectetur voluptatibus. Accusamus a ab dicta et. Consequatur quis dignissimos voluptatem nisi.",
  },
];
</script>
