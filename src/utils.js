const uniqueKeys = (a, b) => {
  const keys = Object.keys(a).concat(Object.keys(b)).sort()
  return [...new Set(keys)]
}

module.exports = {
  compare: (a, b) => {
    let isGreater = false
    let isLess = false

    if (a.clock) a = a.clock
    if (b.clock) b = b.clock

    uniqueKeys(a, b).forEach((key) => {
      const diff = (a[key] || 0) - (b[key] || 0)
      if (diff > 0) isGreater = true
      if (diff < 0) isLess = true
    })

    if (isGreater && isLess) {
      return 0 // cuncurrent
    }

    if (isLess) {
      return -1
    }

    if (isGreater) {
      return 1
    }

    return 0 // cuncurrent
  }
}
