# Protocol Description Unit for NodeJS

*Project is looking for maintainer*

[![NPM](https://nodei.co/npm/node-pdu.png)](https://npmjs.org/package/node-pdu)

## Install

```sh
npm install node-pdu
```

## Usage

Usage in TypeScript (with ES Modules):

```typescript
import { Deliver, parse, Submit } from 'node-pdu';

/*
 * Parse a PDU string
 */

const str = '07919730071111F1000B919746121611F10000811170021222230DC8329BFD6681EE6F399B1C02';
const out = parse(str);

if (out instanceof Deliver) {
	console.log(out.data.getText());
	// Output: "Hello, world!"
}

/*
 * Generate a PDU string
 */

const address = '+999999999999';
const data = 'Hello everyone!';

const submit = new Submit(address, data);

console.log(submit.toString());
// Output: "0001000C9199999999999900000FC8329BFD0695ED6579FEED2E8700"
```

Usage in JavaScript (with CommonJS):

```js
const pdu = require('./dist/index');

/*
 * Parse a PDU string
 */

const str = '07919730071111F1000B919746121611F10000811170021222230DC8329BFD6681EE6F399B1C02';
const out = pdu.parse(str);

if (out instanceof pdu.Deliver) {
	console.log(out.data.getText());
	// Output: "Hello, world!"
}

/*
 * Generate a PDU string
 */

const address = '+999999999999';
const data = 'Hello everyone!';

const submit = new pdu.Submit(address, data);

console.log(submit.toString());
// Output: "0001000C9199999999999900000FC8329BFD0695ED6579FEED2E8700"
```

## Full documentation

Click [here](https://jackkum.github.io/node-pdu/)

## Test script

A small script allows you to scan the library for significant errors.

[Read more](./TestScript.md)

---

## Author

👤 **jackkum**

- Github: [@jackkum](https://github.com/jackkum)
