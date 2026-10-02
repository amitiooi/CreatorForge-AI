import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTypeScript from 'eslint-config-next/typescript'

export default defineConfig([
  ...nextVitals,
  ...nextTypeScript,
  globalIgnores([
    '.next/**',
    'out/**',
    'dist/**',
    'coverage/**',
    'next-env.d.ts',
    '__v0_*',
    '.v0/**',
    'user_read_only_context/**',
  ]),
])
