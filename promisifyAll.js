const promisify = require('./promisify')

const shouldPromisify = (obj, key) =>
  typeof obj[key] === 'function'

/**
 * Converts all functions in an object from node-style callbacks to promise-returning functions.
 * Does not modify the original function and instead returns a new object.
 * 
 * @alias promisifyAll
 * @param {Object} obj - Object to promisify.
 * @returns {Object} Object with all functions promisified.
 * @example
 * import promisifyAll from 'functional-helpers/promisifyAll'
 * import fs from 'fs'
 * 
 * const fsp = promisifyAll(fs)
 * 
 * // works as a promise
 * fsp.readFile('file.txt', 'utf8')
 *   .then(file => console.log(file))
 *   .catch(err => console.log('error reading file', err))
 *
 * // also works as a callback
 * fsp.readFile('file.txt', 'utf8', (err, file) => {
 *   if (err) return console.log('error reading file', err)
 *   console.log(file)
 * })
 */
const promisifyAll = obj =>
  Object.keys(obj)
    .reduce((acc, key) => {
      if (shouldPromisify(obj, key)) {
        Object.assign(acc, { [key]: promisify(obj[key], obj) })
      }

      return acc
    }, {})

module.exports = promisifyAll
