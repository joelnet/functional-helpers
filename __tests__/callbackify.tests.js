const callbackify = require('../callbackify')

describe('callbackify', () => {
    test('promises/callbackify with no arguments returns success', done => {
        const expected = {}
        callbackify(() => Promise.resolve(expected))
            ((err, data) => {
                expect(err).toBe(null)
                expect(data).toBe(expected)
                done()
            })
    })

    test('promises/callbackify success returns success', done => {
        callbackify((x, y) => Promise.resolve(x + y))
            (2, 3, (err, data) => {
                expect(err).toBe(null)
                expect(data).toBe(5)
                done()
            })
    })

    test('promises/callbackify reject returns err', done => {
        callbackify((x, y) => Promise.reject(x + y))
            (2, 3, (err, data) => {
                expect(err).toBe(5)
                expect(data).toBe(undefined)
                done()
            })
    })
})
