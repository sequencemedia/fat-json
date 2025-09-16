type ArrayLiteralType = FatJsonTypes.ArrayLiteralType
type ObjectLiteralType = FatJsonTypes.ObjectLiteralType
type ValueType = FatJsonTypes.ValueType

export default function genPath (key: PropertyKey, value: ValueType, context: ArrayLiteralType | ObjectLiteralType): IterableIterator<{ key: PropertyKey; value: ValueType; path: string; context: ArrayLiteralType | ObjectLiteralType }>
