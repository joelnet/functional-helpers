const success = f => x => f(null, x)
const fail = f => x => f(x)

module.exports = function callbackify(promise) {
    const self = this

    return function callbackify_() {
        const args = Array.prototype.slice.call(arguments, 0, arguments.length - 1)
        const callback = arguments[arguments.length - 1]

        promise.apply(self, args)
            .then(success(callback))
            .catch(fail(callback))
    }
}
