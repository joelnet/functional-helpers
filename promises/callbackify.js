const success = f => x => f(null, x)
const fail = f => x => f(x)

module.exports = (promise) =>
    function() {
        const args = Array.prototype.slice.call(arguments, 0, arguments.length - 1)
        const callback = arguments[arguments.length - 1]

        promise.apply(null, args)
            .then(success(callback))
            .catch(fail(callback))
    }
