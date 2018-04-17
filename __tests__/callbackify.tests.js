const callbackify = require('../callbackify')

describe('callbackify', () => {
  test('promises/callbackify with no arguments returns success', done => {
    const expected = {}
    const callback = callbackify(() => Promise.resolve(expected))

    callback((err, data) => {
      expect(err).toBe(null)
      expect(data).toBe(expected)
      done()
    })
  })

  test('promises/callbackify success returns success', done => {
    const expected = 5
    const callback = callbackify((x, y) => Promise.resolve(x + y))

    callback(2, 3, (err, data) => {
      expect(err).toBe(null)
      expect(data).toBe(expected)
      done()
    })
  })

  test('promises/callbackify reject returns err', done => {
    const expected = 5
    const callback = callbackify((x, y) => Promise.reject(x + y))

    callback(2, 3, (err, data) => {
      expect(err).toBe(expected)
      expect(data).toBe(undefined)
      done()
    })
  })
})
