<template>
  <portal to="modals">
    <transition @after-enter="showModalInner = true">
      <div
        class="fixed z-10 inset-0 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
        v-if="show"
      >
        <div
          class="
            flex
            items-end
            justify-center
            min-h-screen
            pt-4
            px-4
            pb-20
            text-center
            sm:block sm:p-0
          "
        >
          <!--
      Background overlay, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0"
    -->
          <transition
            enter-active-class="transition-opacity ease-linear duration-300"
            leave-active-class="transition-opacity ease-linear duration-200"
            enter-class="opacity-0"
            enter-to-class="opacity-100"
            leave-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <div
              class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
              v-if="showModalInner"
            ></div>
          </transition>

          <!-- This element is to trick the browser into centering the modal contents. -->
          <span
            class="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
            >&#8203;</span
          >

          <!--
      Modal panel, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        To: "opacity-100 translate-y-0 sm:scale-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100 translate-y-0 sm:scale-100"
        To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    -->
          <transition
            enter-active-class="ease-out duration-300"
            leave-active-class="ease-in duration-200"
            enter-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to-class="opacity-100 translate-y-0 sm:scale-100"
            leave-class="opacity-100 translate-y-0 sm:scale-100"
            leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            @after-leave="close"
          >
            <div
              class="
                inline-block
                align-bottom
                bg-white
                rounded-lg
                px-4
                pt-5
                pb-4
                text-left
                overflow-hidden
                shadow-xl
                transform
                transition-all
                sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6
              "
              v-if="showModalInner"
            >
              <slot v-bind:closemodal="handleClose"></slot>
            </div>
          </transition>
        </div>
      </div>
    </transition>
  </portal>
</template>

<script>
export default {
  name: 'ModalLogin',
  props: ['show'],
  data() {
    return {
      showModal: this.show,
      showModalInner: false
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    handleClose() {
      this.showModalInner = false
    }
  }
}
</script>
