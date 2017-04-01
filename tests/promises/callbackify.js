const test = require('tape')

const callbackify = require('../../promises/callbackify')

test('promises/callbackify with no arguments returns success', t => {
    const expected = {}
    callbackify(() => Promise.resolve(expected))
        ((err, data) => {
            t.equal(err, null, 'err should be null')
            t.equal(data, expected, 'data should equal expected')
            t.end()
        })
})

test('promises/callbackify success returns success', t => {
    callbackify((x, y) => Promise.resolve(x + y))
        (2, 3, (err, data) => {
            t.equal(err, null, 'err should be null')
            t.equal(data, 5, 'data should be 5')
            t.end()
        })
})

test('promises/callbackify reject returns err', t => {
    callbackify((x, y) => Promise.reject(x + y))
        (2, 3, (err, data) => {
            t.equal(err, 5, 'err should be 5')
            t.equal(data, undefined, 'data should be undefined')
            t.end()
        })
})
