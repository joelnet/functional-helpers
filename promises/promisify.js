module.exports = func => {
    return function() {
        const args = Array.prototype.slice.call(arguments);

        return new Promise((resolve, reject) => {
            resolve(func.apply(null, args.concat([(err, data) =>
                err ? reject(err) : resolve(data)
            ])))
        })
    }
}
