declare global {
  namespace FatJsonTypes {
    export type ArrayLiteralType = unknown[] | never[]
    export type ObjectLiteralType = Record<PropertyKey, unknown> | Record<PropertyKey, never>
    export type ValueType = string | number | boolean | null | bigint | ArrayLiteralType | ObjectLiteralType | Buffer | undefined | object

    export namespace PathTypes {
      export interface ArrayPathDescriptor {
        key: PropertyKey
        value: ValueType
        path: string
        context: ArrayLiteralType
      }

      export interface ObjectPathDescriptor {
        key: PropertyKey
        value: ValueType
        path: string
        context: ObjectLiteralType
      }

      export interface PathDescriptor {
        key: PropertyKey
        value: ValueType
        path: string
        context: ArrayLiteralType | ObjectLiteralType
      }
    }
  }
}

export {}
