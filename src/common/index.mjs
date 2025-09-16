/**
 *  @typedef {FatJsonTypes.ValueType} ValueType
 */

export const BIG_INT = /^(\d+)n$/

/**
 *  @param {ValueType | ValueType[]} v
 *  @returns {v is any[]}
 */
export function isArray (v) {
  return Array.isArray(v)
}

/**
 *  @param {ValueType | ValueType[]} v
 *  @returns {v is object}
 */
export function isObject (v) {
  return (v || false) instanceof Object && !Array.isArray(v)
}
