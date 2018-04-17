const fs = require('fs')
const promisifyAll = require('../promisifyAll')

const getLib = () => {
    var obj = function() {
        this.myString = 'expected'
        this.myCallback = callback => callback(null, this.myString)
    }

    return new obj()
}

describe('promisifyAll', () => {
    test('creates promisified callbacks', () => {
        const myLib = getLib()
        const promisifiedLib = promisifyAll(myLib)

        expect(typeof promisifiedLib.myCallback).toBe('function')
    })

    test('does not copy non-Functions', () => {
        const myLib = getLib()
        const promisifiedLib = promisifyAll(myLib)

        expect(typeof promisifiedLib.myString).toBe('undefined')
    })

    test('function returns a Promise', done => {
        const myLib = getLib()
        const promisifiedLib = promisifyAll(myLib)

        promisifiedLib.myCallback()
            .then(data => {
                expect(data).toBe(myLib.myString)
                done()
            })
    })

    test('function does not change the this context', done => {
        const myLib = getLib()
        const promisifiedLib = promisifyAll(myLib)

        promisifiedLib.myCallback()
            .then(data => {
                expect(data).toBe(myLib.myString)
                done()
            })
    })

    test('works with fs', done => {
        const pfs = promisifyAll(fs)
        const file = process.cwd() + '/promisifyAll.js'

        fs.readFile(file, 'utf8', (err, data) => {
            pfs.readFile(file, 'utf8')
                .then(pdata => {
                    expect(pdata).toBe(data)
                    expect(err).toBe(null)
                    expect(typeof data).toBe('string')
                    done()
                })
        })
    })
})
