/**
 *  @typedef {import('#types').ArrayLiteralType} ArrayLiteralType
 *  @typedef {import('#types').ObjectLiteralType} ObjectLiteralType
 *  @typedef {import('#types').ValueType} ValueType
 *  @typedef {import('#types').PathTypes.ArrayPathDescriptor} PathTypes.ArrayPathDescriptor
 *  @typedef {import('#types').PathTypes.ObjectPathDescriptor} PathTypes.ObjectPathDescriptor
 *  @typedef {import('#types').PathTypes.PathDescriptor} PathTypes.PathDescriptor
 */

import {
  formatNumber,
  formatString,
  isArray,
  isObject
} from '#common'

/**
 *  @param {ArrayLiteralType} context
 *  @param {string} contextPath
 *  @returns {IterableIterator<PathTypes.ArrayPathDescriptor>}
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
 *  @param {ObjectLiteralType} context
 *  @param {string} contextPath
 *  @returns {IterableIterator<PathTypes.ObjectPathDescriptor>}
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
 *  @param {ValueType} value
 *  @param {ArrayLiteralType | ObjectLiteralType} context
 *  @returns {IterableIterator<PathTypes.PathDescriptor>}
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
