<script>
import { Doughnut } from 'vue-chartjs'

export default {
  extends: Doughnut,
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
