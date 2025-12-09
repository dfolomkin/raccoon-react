import { defineConfig } from 'eslint/config'
import pluginJs from '@eslint/js'
import pluginTs from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import pluginReactHook from 'eslint-plugin-react-hooks'
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
  pluginTs.configs.recommended,
  // NOTE: enabling type-aware linting causes non-refreshing cheking issue with eslint-webpack-plugin
  // pluginTs.configs.recommendedTypeChecked,
  // {
  //   languageOptions: {
  //     parserOptions: {
  //       project: true,
  //       tsconfigRootDir: import.meta.dirname,
  //     },
  //   },
  // },
  pluginReact.configs.flat.recommended,
  pluginReactHook.configs.flat.recommended,
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  // NOTE: runs prettier as an eslint rule and reports differences as eslint errors
  // includes eslint-config-prettier
  pluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
        __VERSION__: 'readonly',
      },
    },
    plugins: {
      'simple-import-sort': pluginImportSort,
    },
    rules: {
      // NOTE: this rule primary used for error highlighting (and not for format on save)
      // Formating on save happens due to:
      // 1) .prettierrc, vscode extension and setting "editor.formatOnSave": true
      // .prettierrc is still needed for processing files out of eslint service (like eslint.config.js itself)
      // 2) this rule, eslint-plugin-prettier/recommended (actualy fixing all rules) and settings "editor.codeActionsOnSave": { "source.fixAll.eslint": "explicit" }
      // or with "fix all auto-fixable" context menu
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
      'no-console': 'warn',
      'no-undef': 'warn',
      'no-unused-vars': 'off',
      'padding-line-between-statements': [
        'warn',
        { blankLine: 'always', prev: '*', next: ['const', 'let'] },
        { blankLine: 'always', prev: ['const', 'let'], next: '*' },
        { blankLine: 'any', prev: ['const', 'let'], next: ['const', 'let'] },
      ],
      '@typescript-eslint/no-unused-vars': 'warn',
      'react/prop-types': 'off',
    },
  },
])
