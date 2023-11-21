const IS_PROD = process.env.NODE_ENV === 'production';
const { lineLength } = require('@arpon/prettier-config/shared.cjs');
const { clientEnvironment } = require('@arpon/utils');

module.exports = {
  root: true,
  env: {
    es6: true,
    es2021: true,
    browser: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'airbnb',
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'html', 'import', 'prettier'],
  globals: {
    ...clientEnvironment('ESLint'),
    ...{
      __APP_ENV__: 'readonly',
      __NODE_ENV__: 'readonly',
      __BROWSER__: 'readonly',
      __PROD__: 'readonly',
      __TEST__: 'readonly',
      __DEV__: 'readonly',
      __DEBUG_LVL__: 'readonly',
      __PLATFORM__: 'writable',
      DEVHOST_IP: 'readonly',
      LOG_INFO: 'readonly',
      LOG_ERROR: 'readonly',
      LOG_WARN: 'readonly',
      LOG: 'readonly',
      window: 'readonly',
    },
  },
  rules: {
    /** Prettier warning */
    'prettier/prettier': 'error',

    // ! Code

    'no-console': IS_PROD ? ['warn', { allow: ['warn', 'error'] }] : 'off',

    /** Allow to use new for side effects */
    'no-new': 'off',

    /** Disallow variable declarations from shadowing variables declared in the outer scope */
    'no-shadow': 'off',

    /** Allow implicit return */
    'consistent-return': 'off',

    /** Allow ++ -- operators */
    'no-plusplus': 'off',

    /** Allow to reassign method parameters */
    'no-param-reassign': 'off',

    /** Disallow implicit the location of arrow function bodies */
    'implicit-arrow-linebreak': 'off',

    /** Force empty line after  */
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: ['block-like'], next: 'if' },
    ],

    /** Allow operatorns stay after line break */
    'operator-linebreak': [
      'error',
      'after',
      {
        overrides: { '?': 'before', ':': 'before' },
      },
    ],

    /** Allow nested ? ternary : expressions ? ... : ...  */
    'no-nested-ternary': 'off',

    /** Allow class methods to not use 'this' */
    'class-methods-use-this': 'off',

    /** Disallows shorthand type conversions */
    'no-implicit-coercion': [
      'error',
      {
        boolean: false,
        number: true,
        string: true,
        allow: ['!!'],
        disallowTemplateShorthand: false,
      },
    ],

    /** Allow returning values from Promise executor functions */
    'no-promise-executor-return': 'off',

    // ! Style

    /** Not allow __variables__ with underscores */
    'no-underscore-dangle': 'error',

    /** Not allow both LF and CRLF line endings */
    'linebreak-style': ['error', 'unix'],

    'lines-around-comment': [
      'error',
      {
        beforeBlockComment: false,
        beforeLineComment: true,
        allowBlockStart: true,
        allowObjectStart: true,
        allowArrayStart: true,
        allowObjectEnd: true,
        ignorePattern: '//',
      },
    ],

    /** Allow anonymous functions */
    'func-names': 'off',

    camelcase: [
      'error',
      {
        properties: 'never',
        ignoreDestructuring: true,
      },
    ],

    // ! Import rules
    /** Not enforce file extensions on 'import' statements because ESM */
    'import/extensions': 'off',

    /** Don't complain about non-module files */
    'import/no-unresolved': [
      'error',
      {
        ignore: [
          '.(?:tsx|html)$',
          '^(@mononow[\\/]|tsx-)',
          '.(?:ts)$',
          '(.*).PLATFORM(.(gif|jpe?g|png|ico|svg|bmp))',
        ],
      },
    ],

    /** Allow to import peer dependencies */
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
        peerDependencies: true,
      },
    ],

    /** Warn to prefer to use default export or not */
    'import/prefer-default-export': 'warn',

    // ! prettier override

    /** Disable indent to not conflict with prettier */
    indent: 'off',

    /** Max line length */
    'max-len': [
      'warn',
      lineLength,
      2,
      {
        ignoreUrls: true,
        ignoreComments: true,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],

    /** Require semicolons without enforcing */
    semi: ['error', 'always'],

    quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],

    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'always-multiline',
      },
    ],

    // ! React rules

    // Impossible enabling this with so many props.
    'react/jsx-props-no-spreading': 'off',

    // ! TS global rules

    '@typescript-eslint/no-shadow': 'error',

    // ! Parse services disabled

    // disabled type-aware linting due to performance considerations
    '@typescript-eslint/return-await': 'off',
    'no-return-await': 'error',

    // disabled that requires parserServices to be generated
    '@typescript-eslint/no-throw-literal': 'off',
    'no-throw-literal': 'error',

    // disabled that requires parserServices to be generated
    '@typescript-eslint/no-implied-eval': 'off',

    // disabled that requires parserServices to be generated
    '@typescript-eslint/dot-notation': 'off',
    'dot-notation': 'error',
  },
  overrides: [
    {
      files: ['*.js', '*.cjs'],
      rules: {
        '@typescript-eslint/class-name-casing': 'off',
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      files: ['*.ts'],
      rules: {
        'lines-around-comment': 'off',
        '@typescript-eslint/lines-around-comment': [
          'error',
          {
            allowEnumStart: true,
            allowEnumEnd: true,
            allowInterfaceStart: true,
            allowInterfaceEnd: true,
            allowModuleStart: true,
            allowModuleEnd: true,
            allowTypeStart: true,
            allowTypeEnd: true,
            beforeBlockComment: false,
            beforeLineComment: true,
            allowBlockStart: true,
            allowObjectStart: true,
            allowArrayStart: true,
            allowObjectEnd: true,
          },
        ],
        'no-restricted-exports': 'off',
        'import/prefer-default-export': 'off',
      },
    },
    {
      files: ['**/*.spec.*', '**/*.test.*'],
      env: {
        jest: true,
      },
    },
  ],
  settings: {
    'html/report-bad-indent': 'error',
    'import/resolver': {
      typescript: true,
      node: true,
    },
  },
};
