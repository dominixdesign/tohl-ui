<script>
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  props: ['chartdata', 'options'],
  mounted() {
    this.renderChart(this.chartdata, this.options)
  },
  watch: {
    options(newOptions) {
      this.renderChart(this.chartdata, newOptions)
    }
  }
}
</script>
