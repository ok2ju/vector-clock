const VClock = require('.')
const { compare } = require('./utils')

describe('Vector clock', () => {
  beforeEach(() => {
    this.p1 = new VClock('a')
    this.p2 = new VClock('b')
  })

  test('increment', () => {
    this.p1.increment()
    expect(this.p1.clock).toEqual({ a: 1 })
  })

  test('update', () => {
    this.p2.increment()
    this.p1.update(this.p2.clock)
    expect(this.p1.clock).toEqual({ a: 1, b: 1 })
  })
})

describe('utils', () => {
  beforeEach(() => {
    this.p1 = new VClock('a')
    this.p2 = new VClock('b')
    this.p3 = new VClock('c')
  })

  test('p1 > p2', () => {
    this.p1.increment()
    this.p1.update(this.p2.clock)
    expect(compare(this.p1, this.p2)).toEqual(1)
  })

  test('p1 and p2 are concurrent', () => {
    this.p1.clock = { a: 2, b: 0, c: 0 }
    this.p2.clock = { a: 0, b: 1, c: 1 }
    expect(compare(this.p1, this.p2)).toEqual(0)
  })

  test('p2 > p3', () => {
    this.p2.clock = { a: 0, b: 1, c: 1 }
    this.p3.clock = { a: 0, b: 0, c: 1 }
    expect(compare(this.p2, this.p3)).toEqual(1)
  })

  test('p1 < p3', () => {
    this.p1.clock = { a: 3, b: 0, c: 0 }
    this.p3.clock = { a: 5, b: 3, c: 3 }
    expect(compare(this.p1, this.p3)).toEqual(-1)
  })
})
