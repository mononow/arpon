const IS_PROD = process.env.NODE_ENV === 'production';
const { lineLength } = require('@mononow/prettier-config/shared.cjs');
const { clientEnvironment } = require('@mononow/utils');

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
    'airbnb-base',
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
    extraFileExtensions: ['.svelte'],
  },
  plugins: ['@typescript-eslint', 'html', 'import', 'prettier'],
  globals: {
    ...clientEnvironment('ESLint'),
    ...{
      __APP_ENV__: 'readonly',
      __NODE_ENV__: 'readonly',
      __BROWSER__: 'readonly',
      __POS__: 'readonly',
      __PROD__: 'readonly',
      __TEST__: 'readonly',
      __DEV__: 'readonly',
      __DEBUG_LVL__: 'readonly',
      __SIMULATOR__: 'readonly',
      __APP_MANIFEST__: 'writable',
      __PLATFORM_GENERIC__: 'writable',
      __MODEL__: 'writable',
      __PLATFORM__: 'writable',
      __PLATFORM_S920__: 'writable',
      __PLATFORM_Q92__: 'writable',
      __PLATFORM_Q92S__: 'writable',
      __PLATFORM_Q60__: 'writable',
      __PLATFORM_D195__: 'writable',
      __PLATFORM_D199__: 'writable',
      __PLATFORM_MP35__: 'writable',
      __PLATFORM_MP35P__: 'writable',
      __PLATFORM_V240M__: 'writable',
      __PLATFORM_D230__: 'writable',
      __SUPPORT_SMALL_SCREEN__: 'writable',
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

    /** Don't complain about non-module svelte files */
    'import/no-unresolved': [
      'error',
      {
        ignore: [
          '.(?:svelte|html)$',
          '^(@mononow[\\/]|svelte-)',
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

    // ! TS global rules

    '@typescript-eslint/no-shadow': 'error',
  },
  overrides: [
    {
      files: ['*.svelte'],
      parser: 'svelte-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
        ecmaVersion: 2021,
        ecmaFeatures: {
          globalReturn: false,
          impliedStrict: false,
          jsx: false,
        },
      },
      rules: {
        'import/first': 'off',
        'no-labels': 'off',
        'import/no-mutable-exports': 'off',
        'import/prefer-default-export': 'off',
        'no-return-assign': 'off',
        'no-inner-declarations': 'off',
        'no-undef-init': 'off',
        '@typescript-eslint/no-shadow': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'no-restricted-syntax': ['error', 'ForInStatement', 'ForOfStatement', 'WithStatement'],
      },
    },
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