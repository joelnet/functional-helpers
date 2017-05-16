module.exports = function promisify(func) {
    return (...args) => {
        return new Promise((resolve, reject) => {
            const callback = (err, data) => err ? reject(err) : resolve(data)

            func.apply(this, [...args, callback])
        })
    }
}
