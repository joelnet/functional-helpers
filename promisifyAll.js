const promisify = require('./promisify')

const shouldPromisify = (obj, key) =>
    typeof obj[key] === 'function'

module.exports = obj =>
    Object.keys(obj)
        .reduce((acc, key) => {
            if (shouldPromisify(obj, key)) {
                Object.assign(acc, { [key]: promisify(obj[key], obj) })
            }

            return acc
        }, {})
