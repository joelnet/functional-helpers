const promisify = require('./promisify')

const shouldPromisify = (obj, key) =>
    obj[key] instanceof Function
    && obj[key + 'Async'] === undefined

const keys = obj => {
    const value = []
    for (key in obj) {
        value.push(key)
    }
    return value
}

module.exports = obj =>
    keys(obj)
        .reduce((acc, key) => {
            if (shouldPromisify(obj, key)) {
                acc[key] = promisify(obj[key], obj)
            }

            return acc
        }, {})
