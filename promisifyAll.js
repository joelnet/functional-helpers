const promisify = require('./promisify')

const shouldPromisify = (obj, key) =>
    typeof obj[key] === 'function'

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
                Object.assign(acc, { [key]: promisify(obj[key], obj) })
            }

            return acc
        }, {})
