declare global {
  namespace FatJsonTypes {
    export type ArrayLiteralType = unknown[] | never[]
    export type ObjectLiteralType = Record<PropertyKey, unknown> | Record<PropertyKey, never>
    export type ValueType = string | number | boolean | null | bigint | ArrayLiteralType | ObjectLiteralType | Buffer | undefined | object
  }
}

export {}
