const test = require('tape')

const promisify = require('../../promises/promisify')

test('promises/promisify with no arguments returns success', t => {
    const expected = {}
    const myPromise = promisify(callback => callback(null, expected))

    promisify(callback => callback(null, expected))()
        .then(data => {
            t.equal(data, expected, 'data should equal expected')
            t.end()
        })
})

test('promises/promisify success returns success', t => {
    promisify((x, y, callback) => callback(null, x + y))
        (2, 3, (err, data) => {
            t.equal(err, null, 'err should be null')
            t.equal(data, 5, 'data should be 5')
            t.end()
        })
})

test('promises/promisify reject returns err', t => {
    promisify((x, y, callback) => callback(x + y))
        (2, 3, (err, data) => {
            t.equal(err, 5, 'err should be 5')
            t.equal(data, undefined, 'data should be undefined')
            t.end()
        })
})
