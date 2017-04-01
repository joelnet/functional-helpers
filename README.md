# functional-js
Functional JavaScript Helpers

## Promises

This is not a Promise library. This is a collection of functions to help make callback and promise life a little easier.

### Promisify

`promisify` converts a node-style callback Function into a Promise. See `callbackify` if you need the reverse.

**Example**

```js
import promisify from'functional-js/promises/promisify'

function myCallback(x, y, callback) {
    setTimeout(function() {
        callback(null, x + y)
    }, 0)
}

const myPromise = promisify(myCallback)

myPromise(2, 3)
    .then(data => {
        console.log(data)
        // => 5
    })
    
```

### Callbackify

This is the opposite of `promisify`. `callbackify` will convert a Function that returns a Promise into a node-style callback Function.

**Example**

```js
import callbackify from'functional-js/promises/callbackify'

const myPromise = (x, y) => Promise.resolve(x + y)

const myCallback = callbackify(myPromise)

myCallback(2, 3, (err, data) => {
    console.log(data)
    // => 5
})

```
