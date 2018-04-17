const success = f => x => f(null, x)
const fail = f => x => f(x)

module.exports = (promise, context) => (...args) => {
  const callback = args[args.length - 1]

  promise.apply(context, args)
    .then(success(callback))
    .catch(fail(callback))
}
