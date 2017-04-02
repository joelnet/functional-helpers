const test = require('tape')
const fs = require('fs')

const promisifyAll = require('../../promises/promisifyAll')

const getLib = () => {
    var obj = function() {
        this.myString = 'expected'
        this.myCallback = callback => callback(null, this.myString)
        this.myAsync = () => Promise.resolve()
    }

    return new obj()
}


test('promises/promisifyAll creates promisified callbacks', t => {
    const myLib = getLib()

    promisifyAll(myLib)

    t.equal(typeof myLib.myCallbackAsync, 'function', 'myLib.myCallbackAsync should be function')
    t.end()
})

test('promises/promisifyAll does not promisify non-Functions', t => {
    const myLib = getLib()

    promisifyAll(myLib)

    t.equal(typeof myLib.myString, 'string', 'myLib.myString should be string')
    t.end()
})

test('promises/promisifyAll does not promisify functions that end with Async', t => {
    const myLib = getLib()

    promisifyAll(myLib)

    t.false('myAsyncAsync' in myLib, 'myAsyncAsync should not exist')
    t.end()
})

test('promises/promisifyAll does not modify functions that end with Async', t => {
    const myLib = getLib()
    const expected = myLib.myAsync

    promisifyAll(myLib)

    t.equal(myLib.myAsync, expected)
    t.end()
})

test('promises/promisifyAll Async function returns a Promise', t => {
    const myLib = getLib()

    promisifyAll(myLib)

    myLib.myCallbackAsync()
        .then(data => {
            t.equal(data, 'expected', 'data should be expected')
            t.end()
        })
})

test('promises/promisifyAll works with fs', t => {
    promisifyAll(fs)

    fs.readFile(__dirname + '/promisifyAll.js', 'utf8', (err, data) => {
        fs.readFileAsync(__dirname + '/promisifyAll.js', 'utf8')
            .then(data2 => {
                t.equal(data2, data)
                t.equal(err, null, 'err should be null')
                t.equal(typeof data, 'string')
                t.end()
            })
    })
})
