module.exports = (func, context) => (...args) =>
  new Promise((resolve, reject) => {
    const callback = (err, data) => err ? reject(err) : resolve(data)

    func.apply(context, [...args, callback])
  })
