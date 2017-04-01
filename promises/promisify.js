module.exports = func => {
    return function() {
        const args = Array.prototype.slice.call(arguments);

        return new Promise((resolve, reject) => {
            const callback = (err, data) => err ? reject(err) : resolve(data)

            resolve(func.apply(null, args.concat([callback])))
        })
    }
}
