module.exports = func => {
    return function() {
        const args = Array.prototype.slice.call(arguments);

        return new Promise((resolve, reject) => {
            const callback = (err, data) => err ? reject(err) : resolve(data)

            func.apply(this, args.concat([callback]))
        })
    }
}
