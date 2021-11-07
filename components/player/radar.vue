<script>
import { Radar } from 'vue-chartjs'

export default {
  extends: Radar,
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
