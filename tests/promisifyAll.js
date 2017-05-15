const test = require('tape')
const fs = require('fs')

const promisifyAll = require('../promisifyAll')

const getLib = () => {
    var obj = function() {
        this.myString = 'expected'
        this.myCallback = callback => callback(null, this.myString)
    }

    return new obj()
}

test('promises/promisifyAll creates promisified callbacks', t => {
    const myLib = getLib()
    const promisifiedLib = promisifyAll(myLib)

    t.equal(typeof promisifiedLib.myCallback, 'function', 'promisifiedLib.myCallback should be function')
    t.end()
})

test('promises/promisifyAll does not copy non-Functions', t => {
    const myLib = getLib()
    const promisifiedLib = promisifyAll(myLib)

    t.equal(typeof promisifiedLib.myString, 'undefined', 'promisifiedLib.myString should be undefined')
    t.end()
})

test('promises/promisifyAll function returns a Promise', t => {
    const myLib = getLib()
    const promisifiedLib = promisifyAll(myLib)

    promisifiedLib.myCallback()
        .then(data => {
            t.equal(data, myLib.myString, 'data should be expected')
            t.end()
        })
})

test('promises/promisifyAll function does not change the this context', t => {
    const myLib = getLib()
    const promisifiedLib = promisifyAll(myLib)

    promisifiedLib.myCallback()
        .then(data => {
            t.equal(data, myLib.myString, 'data should be expected')
            t.end()
        })
})

test('promises/promisifyAll works with fs', t => {
    const pfs = promisifyAll(fs)
    const file = __dirname + '/promisifyAll.js'

    fs.readFile(file, 'utf8', (err, data) => {
        pfs.readFile(file, 'utf8')
            .then(pdata => {
                t.equal(pdata, data)
                t.equal(err, null, 'err should be null')
                t.equal(typeof data, 'string')
                t.end()
            })
    })
})
