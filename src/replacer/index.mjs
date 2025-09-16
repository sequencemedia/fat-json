import {
  formatNumber,
  formatString,
  isArray,
  isObject
} from '#common'

const MAP = new WeakMap()

/**
 *  @param {PropertyKey} key
 *  @param {unknown} value
 *  @param {any} context
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
