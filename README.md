# functional-helpers [![travis-ci build image](https://travis-ci.org/joelnet/functional-helpers.svg?branch=master)](https://travis-ci.org/joelnet/functional-helpers) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/joelnet/functional-js/master/LICENSE)
Functional JavaScript Helpers

# Installation

`npm install --save joelnet/functional-helpers`

Or if you want a specific version

`npm install --save joelnet/functional-helpers#1.4.0`

# API Reference

## Functions

<dl>
<dt><a href="#callbackify">callbackify(promise, [context])</a> ⇒ <code>function</code></dt>
<dd><p>Converts a promise-returning function into a node-sytle callback function.</p>
</dd>
<dt><a href="#promisify">promisify(func, [context])</a> ⇒ <code>function</code></dt>
<dd><p>Converts a node-style callback function into a promise-returning function.</p>
</dd>
<dt><a href="#promisifyAll">promisifyAll(obj)</a> ⇒ <code>Object</code></dt>
<dd><p>Converts all functions in an object from node-style callbacks to promise-returning functions.
Does not modify the original function and instead returns a new object.</p>
</dd>
</dl>

<a name="callbackify"></a>

## callbackify(promise, [context]) ⇒ <code>function</code>
Converts a promise-returning function into a node-sytle callback function.

**Kind**: global function  
**Returns**: <code>function</code> - - A node-style callback function.  

| Param | Type | Description |
| --- | --- | --- |
| promise | <code>function</code> | A promise-returning function. |
| [context] | <code>Object</code> | The context to assign to `this`. |

**Example**  
```js
import callbackify from 'functional-helpers/callbackify'

const callback = callbackify((x, y) => Promise.resolve(x + y))

callback(2, 3, (err, data) => {
  if (err) return console.log('Unknown error', err)
  console.log('result = ', data)
})
```
<a name="promisify"></a>

## promisify(func, [context]) ⇒ <code>function</code>
Converts a node-style callback function into a promise-returning function.

**Kind**: global function  
**Returns**: <code>function</code> - - A function that will return a promise.  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | Node style callback function to convert. |
| [context] | <code>Object</code> | The context to assign to `this`. |

**Example**  
```js
import promisify from 'functional-helpers/promisify'

const readFile = promisify(fs.readFile)
readFile('file.txt')
  .then(file => console.log(file))
  .catch(err => console.log('error reading file', err))
```
<a name="promisifyAll"></a>

## promisifyAll(obj) ⇒ <code>Object</code>
Converts all functions in an object from node-style callbacks to promise-returning functions.
Does not modify the original function and instead returns a new object.

**Kind**: global function  
**Returns**: <code>Object</code> - - Object with all functions promisified.  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | Object to promisify. |

**Example**  
```js
import promisifyAll from 'functional-helpers/promisifyAll'
import fs from 'fs'

const fsp = promisifyAll(fs)

fsp.readFile('file.txt')
  .then(file => console.log(file))
  .catch(err => console.log('error reading file', err))
```

# License

[MIT License](LICENSE)
