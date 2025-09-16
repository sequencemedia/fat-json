/**
 *  @param {BigInt} value
 *  @returns {string}
 */
export function fromBigIntToString (value) {
  return String(value)
}

/**
 *  @param {string} value
 *  @returns {BigInt}
 */
export function fromStringToBigInt (value) {
  return BigInt(value)
}

/**
 * @param {string} b
 * @returns {number}
 */
function toCodePoint (b) {
  const c = b.codePointAt(0)

  return Number(c)
}

/**
 *  ```javascript
 *  Buffer.from(Uint8Array.fromBase64(base64))
 *  ```
 *  @param {string} base64
 *  @returns {Buffer}
 */
export function fromBase64ToBuffer (base64) {
  const binary = atob(base64) // base64 string to binary string
  const uint8Array = Uint8Array.from(binary, toCodePoint) // binary string to code point integer
  return Buffer.from(uint8Array)
}

/**
 *  @param {Buffer} buffer
 *  @returns {string}
 */
export function fromBufferToBase64 (buffer) {
  return buffer.toString('base64')
}
