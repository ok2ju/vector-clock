class VClock {
  constructor (id) {
    this.id = id
    this.clock = {}
    this.clock[this.id] = 0
  }

  get (id) {
    if (this.clock.hasOwnProperty(id)) {
      return this.clock[id]
    }

    return null
  }

  increment () {
    this.clock[this.id]++
  }

  update (remoteClock) {
    this.increment()

    Object
      .keys(remoteClock)
      .forEach((key) => {
        this.clock[key] = Math.max(this.clock[key] || 0, remoteClock[key])
      })

    return this.clock
  }
}

module.exports = VClock
