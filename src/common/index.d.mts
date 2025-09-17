export type ValueType = FatJsonTypes.ValueType

declare const BIG_INT: RegExp

export {
  BIG_INT
}

export function formatNumber (key: number): string

export function formatString (key: string): string

export function isArray (value: ValueType | ValueType[]): value is any[]

export function isObject (value: ValueType | ValueType[]): value is object
