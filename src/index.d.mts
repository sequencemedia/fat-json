export type ArrayLiteralType = FatJsonTypes.ArrayLiteralType
export type ObjectLiteralType = FatJsonTypes.ObjectLiteralType
export type ValueType = FatJsonTypes.ValueType

export function useReplacerWithType (replacer: (key: PropertyKey, value: ValueType, type?: string) => ValueType): (key: PropertyKey, value: ValueType) => ValueType

export function useReviverWithType (reviver: (key: PropertyKey, value: ValueType, type?: string) => ValueType): (key: PropertyKey, value: ValueType) => ValueType

export function useReplacerWithPath (replacer: (key: PropertyKey, value: ValueType, path?: string) => ValueType) : (key: PropertyKey, value: ValueType) => ValueType

export function useReviverWithPath (reviver: (key: PropertyKey, value: ValueType, path?: string) => ValueType): (key: PropertyKey, value: ValueType) => ValueType
