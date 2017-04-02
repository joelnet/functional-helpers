const test = require('tape')

const promisifyAll = require('../../promises/promisifyAll')

const getLib = () => ({
    myString: 'my string',
    myCallback: callback => callback(null, 'expected'),
    myAsync: () => Promise.resolve()

})

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
