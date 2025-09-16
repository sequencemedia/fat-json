/**
 *  @typedef {FatJsonTypes.ValueType} ValueType
 */

export const BIG_INT = /^(\d+)n$/

export function formatNumber (key) {
  return `[${key}]`
}

export function formatString (key) {
  return /[ .]/.test(key)
    ? `.['${key}']`
    : `.${key}`
}

/**
 *  @param {ValueType | ValueType[]} value
 *  @returns {value is any[]}
 */
export function isArray (value) {
  return Array.isArray(value)
}

/**
 *  @param {ValueType | ValueType[]} value
 *  @returns {value is object}
 */
export function isObject (value) {
  return (value || false) instanceof Object && !Array.isArray(value)
}
