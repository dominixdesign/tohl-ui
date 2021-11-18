export default (a, b) => {
  const numberA = a.substr(4, 2)
  const numberB = b.substr(4, 2)
  if (numberA !== numberB) {
    if (numberA > numberB) return 1
    if (numberA < numberB) return -1
    return 0
  } else {
    if (a.includes('pre')) return -1
    if (b.includes('pre')) return 1
    if (a.length === 6) return -1
    if (b.length === 6) return 1
    if (a.includes('PLF')) return -1
    if (b.includes('PLF')) return 1
    return 0
  }
}
