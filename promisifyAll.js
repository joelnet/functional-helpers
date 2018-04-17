const promisify = require('./promisify')

const shouldPromisify = (obj, key) =>
  typeof obj[key] === 'function'

/**
 * Converts all functions in an object from node-style callbacks to promise-returning functions.
 * Does not modify the original function and instead returns a new object.
 * @param {Object} obj - Object to promisify
 * @returns {Object} - Object with all functions promisified
 * @example
 * const fsp = promisifyAll(fs)
 * fsp.readFile('file.txt')
 *   .then(file => console.log(file))
 *   .catch(err => console.log('error reading file', err))
 */
module.exports = obj =>
  Object.keys(obj)
    .reduce((acc, key) => {
      if (shouldPromisify(obj, key)) {
        Object.assign(acc, { [key]: promisify(obj[key], obj) })
      }

      return acc
    }, {})
