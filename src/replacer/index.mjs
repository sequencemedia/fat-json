/**
 *  @typedef {import('#types').ArrayLiteralType} ArrayLiteralType
 *  @typedef {import('#types').ObjectLiteralType} ObjectLiteralType
 *  @typedef {import('#types').ValueType} ValueType
 */

import {
  formatNumber,
  formatString,
  isArray,
  isObject
} from '#common'

/**
 *  @type {WeakMap<WeakKey, ArrayLiteralType | ObjectLiteralType>}
 */
const MAP = new WeakMap()

/**
 *  @param {PropertyKey} key
 *  @param {ValueType} value
 *  @param {ArrayLiteralType | ObjectLiteralType} context
 *  @returns {string}
 */
export default function getPath (key, value, context) {
  let valuePath = String(key) || '$'

  if (MAP.has(context)) {
    const contextPath = MAP.get(context)

    valuePath = (
      contextPath + (
        Array.isArray(context)
          ? formatNumber(key)
          : formatString(key)
      )
    )
  }

  if (
    isArray(value) ||
    isObject(value)
  ) MAP.set(value, valuePath)

  return valuePath
}
