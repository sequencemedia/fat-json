# Fat Json

Stringify and parse non-standard JSON [data types](#from-wikipedia): _reviver_ and _replacer_ functions for the built-in `JSON` object

## Install

```bash
npm i fat-json
```

## Serialising and de-serialising

Transforming _standard data types_ using the built-in `JSON` object is simple, but the JavaScript language now features other types like `BigInt` which don't serialise/cannot be coerced to another type without potential data loss

Serialising and de-serialising with `JSON.stringify()` and `JSON.parse()` provides _some_ opportunity to safely transform data from one type to another with _replacer_ and _reviver_ functions

#### A typical replacer function for `BigInt`

We can test the `value` and transform based on its type

```javascript
function replacer (key, value) {
  if (typeof value === 'bigint') return String(value)

  return value
}
```

It's hard to argue with the simplicity of transforming from a `BigInt` to a `String` but it's harder to see how we should transform back from a `String` to a `BigInt` without some _additional information_

#### A typical reviver function

Should we transform every `String`?

```javascript
function reviver (key, value) {
  if (typeof value === 'string') return BigInt(value)

  return value
}
```

We could use a catch block. Or else format the _key_ or _value_ such that we can test one or both of them, and then decide what to do

## Fat Json's third argument

_Fat Json_ supplies a _[JSONPath](https://en.wikipedia.org/wiki/JSONPath)_ as the third argument to your _replacer_ or _reviver_ function so you can decide _whether to transform a value by its position in the JSON document_, not just by its `key` or `value`. If you know the structure of your data in advance you can serialise and de-serialise safely and in one step

```javascript
import {
  useReplacerWithPath,
  useReviverWithPath
} from 'fat-json'

const d = {
  id: BigInt(Number.MAX_SAFE_INTEGER)
}

const s = JSON.stringify(d, useReplacerWithPath((key, value, path) => {
  if (path === '$.id') return String(value)

  return value
}))

const o = JSON.parse(s, useReviverWithPath((key, value, path) => {
  if (path === '$.id') return BigInt(value)

  return value
}))
```

_Any data_ which can be represented as a `String` can be serialised and de-serialised in the same way

### _[From Wikipedia](https://en.wikipedia.org/wiki/JSON)_

> JSON's basic data types are:
>
> - Number: a signed decimal number that may contain a fractional part and may
> use exponential E notation but cannot include non-numbers such as NaN. The
> format makes no distinction between integer and floating-point. JavaScript
> uses IEEE-754 double-precision floating-point format for all its numeric
> values (later also supporting BigInt), but other languages implementing JSON
> may encode numbers differently.
> - String: a sequence of zero or more Unicode characters. Strings are delimited
> with double quotation marks and support a backslash escaping syntax.
> - Boolean: either of the values true or false
> - Array: an ordered list of zero or more elements, each of which may be of any
> type. Arrays use square bracket notation with comma-separated elements.
> - Object: a collection of name–value pairs where the names (also called keys)
> are strings. The current ECMA standard states, "The JSON syntax does not
> impose any restrictions on the strings used as names, does not require that
> name strings be unique, and does not assign any significance to the ordering
> of name/value pairs." Objects are delimited with curly brackets and use
> commas to separate each pair, while within each pair, the colon ":" character
> separates the key or name from its value.
> - null: an empty value, using the word null

