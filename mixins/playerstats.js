export default {
  methods: {
    shotpercentage(spercentage) {
      if (spercentage === null) {
        spercentage = 0
      }
      return (
        spercentage?.toLocaleString(undefined, {
          minimumFractionDigits: 1,
          maximumFractionDigits: 1
        }) + '%' || '&mdash;'
      )
    },
    averageicetime(atoi) {
      return `${Math.floor(atoi)}:${('00' + Math.floor((atoi % 1) * 60)).slice(-2)}`
    }
  }
}
