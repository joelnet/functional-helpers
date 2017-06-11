const success = f => x => f(null, x)
const fail = f => x => f(x)

module.exports = function callbackify(promise, self) {
    return (...args) => {
        const onlyArgs = args.slice(0, arguments.length - 1)
        const callback = args[args.length - 1]

        promise.apply(self, args)
            .then(success(callback))
            .catch(fail(callback))
    }
}
