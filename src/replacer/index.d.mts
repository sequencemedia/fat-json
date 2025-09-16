type ArrayLiteralType = FatJsonTypes.ArrayLiteralType
type ObjectLiteralType = FatJsonTypes.ObjectLiteralType
type ValueType = FatJsonTypes.ValueType

export default function getPath (key: PropertyKey, value: ValueType, context: ArrayLiteralType | ObjectLiteralType): string
