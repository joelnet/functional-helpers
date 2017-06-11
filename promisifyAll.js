const promisify = require('./promisify')

const shouldPromisify = (obj, key) =>
    obj[key] instanceof Function
    && obj[key + 'Async'] === undefined

module.exports = obj =>
    Object.keys(obj)
        .reduce((acc, key) => {
            if (shouldPromisify(obj, key)) {
                acc[key] = promisify(obj[key], obj)
            }

            return acc
        }, {})
