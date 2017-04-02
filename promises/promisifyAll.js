const promisify = require('./promisify')

const endsWith = (str, suffix) => 
    str.indexOf(suffix, str.length - suffix.length) !== -1;

const shouldPromisify = (obj, key) =>
    obj[key] instanceof Function
        && obj[key + 'Async'] === undefined

module.exports = obj =>
    Object.keys(obj)
        .reduce((acc, key) => {
            if (shouldPromisify(obj, key)) {
                acc[key] = promisify(obj[key])
            }

            return acc
        }, {})
