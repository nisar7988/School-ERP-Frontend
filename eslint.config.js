// @ts-check

import { tanstackConfig } from '@tanstack/eslint-config'

export default [
  ...tanstackConfig,
  {
    rules: {
      'import/no-cycle': 'off',
      'import/order': 'off',
      'sort-imports': 'off',
      '@typescript-eslint/array-type': 'off',
      '@typescript-eslint/require-await': 'off',
      'pnpm/json-enforce-catalog': 'off',
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
          },
          {
            group: ['@tanstack/react-query', 'axios'],
            message: '🔥 Rule Violation: Routes cannot use React Query or Axios directly. Fetching logic must be encapsulated in features/**/queries/ or features/**/api/.'
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
  
  // 🚀 Feature Layer Isolation (No cross-feature imports!)
  {
    files: ['src/features/students/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': ['error', {
        patterns: [{ group: ['@/features/auth/*', '@/features/classes/*'], message: '🔥 Rule Violation: Cross-feature imports are forbidden.' }]
      }]
    }
  },
  {
    files: ['src/features/classes/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': ['error', {
        patterns: [{ group: ['@/features/auth/*', '@/features/students/*'], message: '🔥 Rule Violation: Cross-feature imports are forbidden.' }]
      }]
    }
  },
  {
    files: ['src/features/auth/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': ['error', {
        patterns: [{ group: ['@/features/students/*', '@/features/classes/*'], message: '🔥 Rule Violation: Cross-feature imports are forbidden.' }]
      }]
    }
  },

  // 🔥 Features API Layer - Pure HTTP only
  {
    files: ['src/features/**/api/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': ['error', {
        patterns: [
          {
            group: ['react', '@tanstack/react-query', '@/features/**/store', '../store', '../../store'],
            message: '🔥 Rule Violation: API layer must be pure HTTP calls. React hooks, Query hooks, and Stores are forbidden here.'
          }
        ]
      }]
    }
  },

  // 🔥 Features Store Layer - No Server State
  {
    files: ['src/features/**/store.ts'],
    rules: {
      'no-restricted-imports': ['error', {
        patterns: [
          {
            group: ['axios', '@/lib/http/client', '../api/*'],
            message: '🔥 Rule Violation: Store cannot fetch or store server state directly. Server state must go through React Query.'
          }
        ]
      }]
    }
  },

  {
    ignores: ['eslint.config.js', 'prettier.config.js', 'src/routeTree.gen.ts'],
  },
]
