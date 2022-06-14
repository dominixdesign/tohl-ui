export const shotpercentage = (spercentage) => {
  if (spercentage === null || isNaN(spercentage)) {
    spercentage = 0
  }
  return (
    spercentage?.toLocaleString(undefined, {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    }) + '%' || '&mdash;'
  )
}

export const averageicetime = (atoi) => {
  if (atoi === null || isNaN(atoi)) {
    atoi = 0
  }
  return `${Math.floor(atoi)}:${('00' + Math.floor((atoi % 1) * 60)).slice(-2)}`
}
