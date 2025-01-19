import pluginJs from '@eslint/js'
import configPrettier from 'eslint-config-prettier'
import pluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import pluginReact from 'eslint-plugin-react'
import pluginImportSort from 'eslint-plugin-simple-import-sort'
import globals from 'globals'
import pluginTs from 'typescript-eslint'

// "type": "module" in package.json is required for eslint work with vscode extension

export default [
  {
    files: ['src/**/*.{js,ts,jsx,tsx}'],
  },
  {
    ignores: ['*.config.js', '*.d.ts'],
  },
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended,
  ...pluginTs.configs.recommended,
  pluginReact.configs.flat.recommended,
  // turn off conflicting rules
  configPrettier,
  // include prettier config to process by eslint
  pluginPrettierRecommended,
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
    plugins: {
      'simple-import-sort': pluginImportSort,
    },
    rules: {
      // it doesn't format on save (prettier does itself), its only for error highlighting
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
      'no-unused-vars': 'warn',
      '@typescript-eslint/no-unused-vars': 'off',
      'no-undef': 'warn',
      'no-console': 'warn',
      'simple-import-sort/imports': [
        'warn',
        {
          groups: [
            // react and other packages + that start with @
            ['^react$', '^@?\\w'],
            // custom aliases imports
            ['^(common|components|pages)'],
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
    },
  },
]
