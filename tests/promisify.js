const test = require('tape')
const fs = require('fs')

const promisify = require('../promisify')

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

test('promises/promisify works with fs', t => {
    fs.readFile(__dirname + '/promisifyAll.js', 'utf8', (err, data) => {
        promisify(fs.readFile)(__dirname + '/promisifyAll.js', 'utf8')
            .then(data2 => {
                t.equal(data2, data)
                t.equal(err, null, 'err should be null')
                t.equal(typeof data, 'string')
                t.end()
            })
        })
})