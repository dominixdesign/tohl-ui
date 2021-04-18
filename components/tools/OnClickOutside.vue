<script>
export default {
  props: {
    do: {
      type: Function,
      required: true,
    },
    ignore: {
      type: HTMLDivElement,
      default: null,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  watch: {
    ignore: {
      immediate: true,
      handler() {
        if (this.active !== true) return
        this.addListeners()
      },
    },
    active: {
      immediate: true,
      handler(active) {
        if (active === true) {
          this.addListeners()
        } else {
          this.removeListeners(true)
        }
      },
    },
  },
  beforeDestroy() {
    this.removeListeners(true)
  },
  mounted() {
    if (this.active === true) this.addListeners()
  },
  methods: {
    initListener() {
      if (this.listener) return
      this.listener = (e) => {
        if (
          this.$el === e.target ||
          this.$el.contains(e.target) ||
          this.$el === e.originalTarget ||
          this.$el.contains(e.originalTarget) ||
          (this.ignore && this.ignore.contains(e.target)) ||
          (this.ignore && this.ignore.contains(e.originalTarget)) ||
          (this.ignore && e.originalTarget?.contains(this.ignore))
        ) {
          return
        }
        this.do(e)
      }
    },
    addListeners() {
      if (this.listener) this.removeListeners()

      this.initListener()

      document.addEventListener('mousedown', this.listener)
    },
    removeListeners() {
      if (!this.listener) return

      document.removeEventListener('mousedown', this.listener)
    },
  },
  render() {
    return this.$slots.default[0]
  },
}
</script>
