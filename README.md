# functional-js ![travis-ci build image](https://travis-ci.org/joelnet/functional-js.svg?branch=master) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/joelnet/functional-js/master/LICENSE)
Functional JavaScript Helpers

# Installation

`npm install --save git+https://github.com/joelnet/functional-js.git`

Or if you want a specific version

`npm install --save git+https://github.com/joelnet/functional-js.git#1.1.0`

## Promises

This is not a Promise library. This is a collection of functions to help make callback and promise life a little easier.

### Promisify

`promisify` converts a node-style callback Function into a Function that returns a Promise. See `callbackify` if you need the reverse.

**Example**

```js
import promisify from 'functional-js/promises/promisify'

// typical node-style callback
function myCallback(x, y, callback) {
    setTimeout(function() {
        callback(null, x + y)
    }, 0)
}

// convert node-style callback into a promise returning function.
const myPromise = promisify(myCallback)

// now we can call it like this
myPromise(2, 3)
    .then(data => {
        console.log(data)
        // => 5
    })
    
```

### PromisifyAll

`promisifyAll` takes an object with node-style callbacks and returns object with promise returning functions.

All functions in the source object are expected be node-style callback Functions.

**Example**

```js
import promisifyAll from 'functional-js/promises/promisifyAll'
import fs          from 'fs'

// turn every callback function into a promise function.
const pfs = promisifyAll(fs)

pfs.readFile('/etc/passwd')
    .then(file => console.log(file))
    .catch(err => console.log(err))
```

### Callbackify

This is the opposite of `promisify`. `callbackify` will convert a Function that returns a Promise into a node-style callback Function.

**Example**

```js
import callbackify from 'functional-js/promises/callbackify'

const myPromise = (x, y) => Promise.resolve(x + y)

const myCallback = callbackify(myPromise)

myCallback(2, 3, (err, data) => {
    console.log(data)
    // => 5
})

```
