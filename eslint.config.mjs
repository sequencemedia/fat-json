import globals from 'globals'
import standard from '@sequencemedia/eslint-config-standard/merge'
import typescript from '@sequencemedia/eslint-config-typescript/merge'

export default [
  ...standard({
    files: [
      '**/*.{mjs,cjs,mts,cts}'
    ],
    ignores: [
      'test'
    ],
    rules: {
      'no-return-assign': 'warn'
    },
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  }),
  ...standard({
    files: [
      'test/**/*.{mjs,cjs,mts,cts}'
    ],
    rules: {
      'no-return-assign': 'warn'
    },
    languageOptions: {
      globals: {
        ...globals.mocha
      }
    }
  }),
  ...typescript({
    files: [
      '**/*.{mts,cts}'
    ],
    ignores: [
      'test'
    ],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-redundant-type-constituents': 'off'
    },
    languageOptions: {
      globals: {
        ...globals.node,
        FatJsonTypes: 'readonly'
      }
    }
  })
]
