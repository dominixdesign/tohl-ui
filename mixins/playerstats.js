export default {
  methods: {
    shotpercentage(spercentage) {
      return (
        spercentage.toLocaleString(undefined, {
          minimumFractionDigits: 1,
          maximumFractionDigits: 1
        }) + '%'
      )
    },
    averageicetime(atoi) {
      return `${Math.floor(atoi)}:${('00' + Math.floor((atoi % 1) * 60)).slice(-2)}`
    }
  }
}
