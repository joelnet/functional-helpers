const fs = require('fs')
const promisify = require('../promisify')

describe('promisify', () => {
    test('with no arguments returns success', done => {
        const expected = {}
        const myPromise = promisify(callback => callback(null, expected))

        promisify(callback => callback(null, expected))()
            .then(data => {
                expect(data).toBe(expected)
                done()
            })
    })

    test('success returns success', done => {
        promisify((x, y, callback) => callback(null, x + y))
            (2, 3, (err, data) => {
                expect(err).toBe(null)
                expect(data).toBe(5)
                done()
            })
    })

    test('reject returns err', done => {
        promisify((x, y, callback) => callback(x + y))
            (2, 3, (err, data) => {
                expect(err).toBe(5)
                expect(data).toBe(undefined)
                done()
            })
    })

    test('works with fs', done => {
        fs.readFile(process.cwd() + '/promisifyAll.js', 'utf8', (err, data) => {
            promisify(fs.readFile)(process.cwd() + '/promisifyAll.js', 'utf8')
                .then(data2 => {
                    expect(data2).toBe(data)
                    expect(err).toBe(null)
                    expect(typeof data).toBe('string')
                    done()
                })
            })
    })
})
