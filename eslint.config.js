import { defineConfig } from 'eslint/config'
import pluginJs from '@eslint/js'
import pluginTs from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import configPrettier from 'eslint-config-prettier'
import pluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import pluginImportSort from 'eslint-plugin-simple-import-sort'
import globals from 'globals'

// NOTE: { "type": "module" } in package.json is required for eslint work with vscode extension

export default defineConfig([
  {
    ignores: ['*.config.js', '*.d.ts', 'server', 'netlify'],
  },
  {
    files: ['src/**/*.{js,ts,jsx,tsx}'],
  },
  pluginJs.configs.recommended,
  pluginTs.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  pluginReact.configs.flat.recommended,
  // NOTE: turn off conflicting rules
  configPrettier,
  // NOTE: include prettier config to process by eslint
  pluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        __VERSION__: 'readonly',
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    plugins: {
      'simple-import-sort': pluginImportSort,
    },
    rules: {
      // NOTE: it doesn't format on save (prettier does itself), its only for error highlighting
      // but can format with "fix all auto-fixable"
      'prettier/prettier': [
        'warn',
        {
          tabWidth: 2,
          printWidth: 80,
          singleQuote: true,
          jsxSingleQuote: false,
          semi: false,
          trailingComma: 'es5',
          endOfLine: 'auto',
        },
      ],
      'simple-import-sort/imports': [
        'warn',
        {
          groups: [
            // react and other packages + that start with @
            ['^react$', '^@?\\w'],
            // custom aliases imports
            ['^(components|pages|services|shared|store)'],
            // anything not matched in another group and relative imports starting with "../"
            ['^@', '^'],
            // relative imports from same folder "./"
            ['^\\./'],
            // style module imports
            ['^.+\\.(module.css|module.less)$'],
            // media imports
            ['^.+\\.(png|jpg|jpeg|svg)$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'warn',
      'react/prop-types': 'off',
      'no-console': 'warn',
      'no-undef': 'warn',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/unbound-method': 'off',
    },
  },
])
