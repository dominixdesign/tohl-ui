<template functional>
  <span
    :style="`background-image: url(${require(`~/assets/teams/${props.teamid}.svg`)});${
      props.styles
    }`"
    aria-hidden="true"
    class="inline-block h-4 w-7 border border-primary-800 bg-white bg-cover bg-center align-middle"
  />
</template>
