const success = f => x => f(null, x)
const fail = f => x => f(x)

/**
 * Converts a promise-returning function into a node-sytle callback function.
 * 
 * @alias callbackify
 * @param {Function} promise - A promise-returning function.
 * @param {Object} [context] - The context to assign to `this`.
 * @returns {Function} - A node-style callback function.
 * @example
 * import callbackify from 'functional-helpers/callbackify'
 * 
 * const callback = callbackify((x, y) => Promise.resolve(x + y))
 * 
 * callback(2, 3, (err, data) => {
 *   if (err) return console.log('Unknown error', err)
 *   console.log('result = ', data)
 * })
 */
const callbackify = (promise, context) => (...args) => {
  const callback = args[args.length - 1]

  promise.apply(context, args)
    .then(success(callback))
    .catch(fail(callback))
}

module.exports = callbackify
