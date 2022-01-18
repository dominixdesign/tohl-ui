<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="absolute bottom-0 left-0 right-0 -z-1 w-auto sm:w-full h-full sm:h-auto"
    viewBox="0 0 1600 800"
  >
    <filter id="blur">
      <feGaussianBlur stdDeviation="3" />
    </filter>
    <rect :fill="background" width="1600" height="800" />
    <g filter="url(#blur)" fill-opacity="0.47">
      <polygon :fill="foreground" points="1600 160 0 460 0 350 1600 50" />
      <polygon :fill="foreground" points="1600 260 0 560 0 450 1600 150" />
      <polygon :fill="foreground" points="1600 360 0 660 0 550 1600 250" />
      <polygon :fill="background" points="1600 460 0 760 0 650 1600 350" />
      <polygon :fill="background" points="1600 800 0 800 0 750 1600 450" />
    </g>
  </svg>
</template>

<script>
export default {
  props: {
    foreground: {
      type: String,
      default: '#F60'
    },
    background: {
      type: String,
      default: '#ffffff'
    }
  }
}
</script>
