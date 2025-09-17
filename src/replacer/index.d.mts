export type ArrayLiteralType = FatJsonTypes.ArrayLiteralType
export type ObjectLiteralType = FatJsonTypes.ObjectLiteralType
export type ValueType = FatJsonTypes.ValueType

export default function getPath (key: PropertyKey, value: ValueType, context: ArrayLiteralType | ObjectLiteralType): string
