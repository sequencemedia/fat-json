/**
 *  @typedef {FatJsonTypes.ValueType} ValueType
 */
import {
  BIG_INT
} from './common/index.mjs'
import getPath from './replacer/index.mjs'
import genPath from './reviver/index.mjs'

/**
 *  @param {(key: PropertyKey, value: ValueType, type?: string) => ValueType} replacer
 *  @returns {(key: PropertyKey, value: ValueType) => ValueType}
 */
export function useReplacerWithType (replacer) {
  /**
   *  @this {any | any[]}
   *  @param {PropertyKey} key
   *  @param {ValueType} value
   *  @returns {ValueType}
   */
  return function withType (key, value) {
    return replacer.call(this, key, value, typeof value)
  }
}

/**
 *  @param {(key: PropertyKey, value: ValueType, type?: string) => ValueType} reviver
 *  @returns {(key: PropertyKey, value: ValueType) => ValueType}
 */
export function useReviverWithType (reviver) {
  /**
   *  @this {any | any[]}
   *  @param {PropertyKey} key
   *  @param {ValueType} value
   *  @returns {ValueType}
   */
  // @ts-ignore
  return function withType (key, value) {
    return this[key] = reviver.call(this, key, value, typeof value)
  }
}

/**
 *  @param {(key: PropertyKey, value: ValueType, path?: string) => ValueType} replacer
 *  @returns {(key: PropertyKey, value: ValueType) => ValueType}
 */
export function useReplacerWithPath (replacer) {
  /**
   *  @this {any | any[]}
   *  @param {PropertyKey} key
   *  @param {ValueType} value
   *  @returns {ValueType}
   */
  return function withPath (key, value) {
    return replacer.call(this, key, value, getPath(key, value, this))
  }
}

/**
 *  @param {(key: PropertyKey, value: ValueType, path?: string) => ValueType} reviver
 *  @returns {(key: PropertyKey, value: ValueType) => ValueType}
 */
export function useReviverWithPath (reviver) {
  /**
   *  @this {any | any[]}
   *
   *  @param {PropertyKey} key
   *  @param {ValueType} value
   *  @returns {ValueType}
   */
  // @ts-ignore
  return function withPath (key, value) {
    if (!key) {
      for (const { path, ...args } of genPath(key, value, this)) {
        if (path !== '$') {
          const {
            context,
            key,
            value
          } = args
          // @ts-ignore
          context[key] = reviver.call(context, key, value, path)
        }
      }

      return this[key] = reviver.call(this, key, value, '$')
    }

    return value
  }
}

/**
 *  @param {PropertyKey} key
 *  @param {ValueType} value
 *  @returns {ValueType}
 */
export function replacer (key, value) {
  if (typeof value === 'bigint') return String(value) + 'n'

  return value
}

/**
 *  @param {PropertyKey} key
 *  @param {ValueType} value
 *  @returns {ValueType}
 */
export function reviver (key, value) {
  if (typeof value === 'string' && BIG_INT.test(value)) return BigInt (value.replace(BIG_INT, '$1'))

  return value
}

/**
 *  @param {Set<PropertyKey>} [set]
 *  @returns {(key: PropertyKey, value: ValueType) => ValueType}
 */
export function getReplacerFor (set = new Set()) {
  /**
   *  @param {PropertyKey} key
   *  @param {ValueType} value
   *  @returns {ValueType}
   */
  return function replacer (key, value) {
    if (set.has(key)) {
      if (typeof value === 'bigint') return String(value)
    }

    return value
  }
}

/**
 *  @param {Set<PropertyKey>} [set]
 *  @returns {(key: PropertyKey, value: ValueType) => ValueType}
 */
export function getReviverFor (set = new Set()) {
  /**
   *  @param {PropertyKey} key
   *  @param {ValueType} value
   *  @returns {ValueType}
   */
  return function reviver (key, value) {
    if (set.has(key)) {
      if (typeof value === 'string') return BigInt(value)
    }

    return value
  }
}
