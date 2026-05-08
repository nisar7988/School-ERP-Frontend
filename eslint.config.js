// @ts-check

import { tanstackConfig } from '@tanstack/eslint-config'
import unusedImports from 'eslint-plugin-unused-imports'

export default [
  ...tanstackConfig,
  {
    plugins: {
      'unused-imports': unusedImports,
    },
    rules: {
      'import/no-cycle': 'off',
      'import/order': 'off',
      'sort-imports': 'off',
      '@typescript-eslint/array-type': 'off',
      '@typescript-eslint/require-await': 'off',
      'pnpm/json-enforce-catalog': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unnecessary-condition': 'off',
      
      // 🗑️ Auto-remove unused imports and vars
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          'vars': 'all',
          'varsIgnorePattern': '^_',
          'args': 'after-used',
          'argsIgnorePattern': '^_',
        },
      ],
    },
  },

  // 🧭 Routing Rules Enforcement
  {
    files: ['src/routes/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': ['error', {
        patterns: [
          {
            group: ['@/features/**/api/*', '../**/api/*', '../../**/api/*'],
            message: '🔥 Rule Violation: Routes cannot directly import the API layer. All server data must flow through React Query hooks defined in features/**/queries/.'
          },
          {
            group: ['@/features/**/store', '../**/store', '../../**/store'],
            message: '🔥 Rule Violation: Routes cannot import stores. Use features/**/queries/ for server state.'
          }
        ]
      }]
    }
  },

  // 🧩 Component Architecture Rules Enforcement
  {
    files: ['src/components/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': ['error', {
        patterns: [
          {
            group: ['@/features/*', '../features/*'],
            message: '🔥 Rule Violation: Global components (src/components) cannot import business logic from features/.'
          }
        ]
      }]
    }
  },

  // 🔌 App Wiring Independence Enforcement
  {
    files: ['src/features/**/*.{ts,tsx}', 'src/routes/**/*.{ts,tsx}', 'src/components/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': ['error', {
        patterns: [
          {
            group: ['@/app/*', '../app/*', '../../app/*'],
            message: '🔥 Rule Violation: Cannot import from the app/ wiring layer. Keep app/ isolated.'
          }
        ]
      }]
    }
  },
  
  // 🔥 Features API Layer - Allow hooks in api/ per rules.md
  {
    files: ['src/features/**/api/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': ['error', {
        patterns: [
          {
            group: ['react'],
            message: '🔥 Rule Violation: API layer services must be pure. However, Query hooks (queries.ts/mutations.ts) are allowed here per rules.md.'
          }
        ]
      }]
    }
  },

  {
    ignores: ['eslint.config.js', 'prettier.config.js', 'src/routeTree.gen.ts'],
  },
]
