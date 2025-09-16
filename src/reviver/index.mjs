/**
 *  @typedef {FatJsonTypes.ArrayLiteralType} ArrayLiteralType
 *  @typedef {FatJsonTypes.ObjectLiteralType} ObjectLiteralType
 *  @typedef {FatJsonTypes.ValueType} ValueType
 *  @typedef {FatJsonTypes.WeakMapType} WeakMapType
 */

import {
  formatNumber,
  formatString,
  isArray,
  isObject
} from '#common'

/**
 *  @param {any[]} context
 *  @param {string} contextPath
 *  @returns {IterableIterator<{ key: PropertyKey; value: unknown; path: string; context: any }>}
 */
function * genPathForArray (context, contextPath) {
  for (const [key, value] of context.entries()) {
    const valuePath = (
      contextPath + formatNumber(key)
    )

    if (isArray(value)) yield * genPathForArray(value, valuePath)

    if (isObject(value)) yield * genPathForObject(value, valuePath)

    yield {
      key: String(key),
      value,
      path: valuePath,
      context
    }
  }
}

/**
 *  @param {any} context
 *  @param {string} contextPath
 *  @returns {IterableIterator<{ key: PropertyKey; value: unknown; path: string; context: any }>}
 */
function * genPathForObject (context, contextPath) {
  for (const [key, value] of Object.entries(context)) {
    const valuePath = (
      contextPath + formatString(key)
    )

    if (isArray(value)) yield * genPathForArray(value, valuePath)

    if (isObject(value)) yield * genPathForObject(value, valuePath)

    yield {
      key: String(key), // should already be a string but
      value,
      path: valuePath,
      context
    }
  }
}

/**
 *  @param {PropertyKey} key
 *  @param {unknown} value
 *  @param {any | any[]} context
 *  @returns {IterableIterator<{ key: PropertyKey; value: unknown; path: string; context: any }>}
 */
export default function * genPath (key, value, context) {
  const valuePath = key
    ? typeof key === 'number'
      ? formatNumber(key)
      : formatString(key)
    : '$'

  if (isArray(value)) yield * genPathForArray(value, valuePath)

  if (isObject(value)) yield * genPathForObject(value, valuePath)

  yield {
    key: String(key),
    value,
    path: valuePath,
    context
  }
}
