type ValueType = FatJsonTypes.ValueType

declare const BIG_INT: RegExp

export {
  BIG_INT
}

export function iArray (v: ValueType | ValueType[]): v is any[]

export function isObject (v: ValueType | ValueType[]): v is object
