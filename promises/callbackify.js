const success = f => x => f(null, x)
const fail = f => x => f(x)

/**
 * callbackify transforms a function that returns a promise into a node-style callback function.
 * 
 * @example
 * const incrementPromise = (x) =>
 *     Promise.resolve(x + 1)
 * 
 * const incrementCallback = callbackify(incrementPromise)
 * 
 * const number = 5
 * 
 * incrementCallback(number, (err, data) => {
 *     console.log(data)
 *     // => 6
 * })
 */
module.exports = (promise) =>
    function() {
        const args = Array.prototype.slice.call(arguments, 0, arguments.length - 1)
        const callback = arguments[arguments.length - 1]

        promise.apply(null, args)
            .then(success(callback))
            .catch(fail(callback))
    }
