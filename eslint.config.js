const js = require('@eslint/js')
const babelParser = require('@babel/eslint-parser')
const react = require('eslint-plugin-react')

module.exports = [
  js.configs.recommended,
  {
    files: [ '**/*.js' ],
    ignores: [ 'lib/**', 'es6/**', 'umd/**', 'node_modules/**' ],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          configFile: './babel.config.js'
        },
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        document: 'readonly',
        window: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        module: 'readonly',
        require: 'readonly',
        process: 'readonly',
        globalThis: 'readonly',
        __dirname: 'readonly'
      }
    },
    plugins: {
      react
    },
    rules: {
      'no-unused-vars': [ 'error', { argsIgnorePattern: '^_' } ],
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react/prop-types': 'off',
      semi: [ 'error', 'never' ]
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  }
]
