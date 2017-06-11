module.exports = function promisify(func, self) {
    return (...args) => {
        return new Promise((resolve, reject) => {
            const callback = (err, data) => err ? reject(err) : resolve(data)

            func.apply(self, [...args, callback])
        })
    }
}
