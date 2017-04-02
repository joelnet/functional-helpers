const promisify = require('./promisify')

const endsWith = (str, suffix) => 
    str.indexOf(suffix, str.length - suffix.length) !== -1;

const shouldPromisify = (obj, key) =>
    !endsWith(key, 'Async')
        && obj[key] instanceof Function
        && obj[key + 'Async'] === undefined

module.exports = obj =>
    Object.keys(obj)
        .reduce((obj, key) => {
            if (shouldPromisify(obj, key)) {
                obj[key + 'Async'] = promisify(obj[key])
            }

            return obj
        }, obj)
