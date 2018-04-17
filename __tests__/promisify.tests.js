const fs = require('fs')
const promisify = require('../promisify')

describe('promisify', () => {
  test('with no arguments resolves', () => {
    expect.assertions(1)
    const expected = {}
    const promise = promisify(callback => callback(null, expected))

    return promise()
      .then(data => expect(data).toBe(expected))
  })

  test('resolves', () => {
    expect.assertions(1)
    const promise = promisify((x, y, callback) => callback(null, x + y))
    
    return promise(2, 3)
      .then(data => expect(data).toBe(5))
  })

  test('rejects', () => {
    expect.assertions(1)
    const promise = promisify((x, y, callback) => callback(x + y))
    
    return promise(2, 3)
      .catch(err => expect(err).toBe(5))
  })

  test('calls callback with data', done => {
    expect.assertions(2)
    const promise = promisify((x, y, callback) => callback(null, x + y))
    
    return promise(2, 3, (err, data) => {
      expect(err).toBe(null)
      expect(data).toBe(5)
      done()
    })
  })

  test('calls callback with error', done => {
    expect.assertions(2)
    const promise = promisify((x, y, callback) => callback(x + y))

    promise(2, 3, (err, data) => {
      expect(err).toBe(5)
      expect(data).toBe(undefined)
      done()
    })
  })

  test('works with fs', done => {
    expect.assertions(1)
    const readFile = promisify(fs.readFile)
    const args = [process.cwd() + '/LICENSE', 'utf8']

    fs.readFile(...args, (err, data) => {
      readFile(...args)
        .then(data2 => expect(data2).toBe(data))
        .then(done)
    })
  })
})
