module.exports = function promisify(func) {
    const self = this

    return function promisify_() {
        const args = Array.prototype.slice.call(arguments);

        return new Promise((resolve, reject) => {
            const callback = (err, data) => err ? reject(err) : resolve(data)

            func.apply(self, args.concat([callback]))
        })
    }
}
