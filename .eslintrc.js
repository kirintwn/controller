module.exports = {
  // parser: 'babel-eslint',
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    node: true,
    'jest/globals': true,
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack.base.config.js',
      },
    },
  },
  extends: [
    'airbnb',
    'plugin:jest/recommended',
    'plugin:import/typescript',
    'plugin:jsx-a11y/recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    tsconfigRootDir: './',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint', 'jest', 'react', 'jsx-a11y', 'prettier'],
  rules: {
    'import/prefer-default-export': 'off',
    'class-methods-use-this': 'off',
    'consistent-return': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    'no-unused-vars': 'warn',
    'no-continue': 'off',
    'no-bitwise': 'off',
    'no-underscore-dangle': 'off',
    'no-param-reassign': ['error', { props: false }],
    'no-restricted-syntax': [
      'error',
      'ForInStatement',
      'LabeledStatement',
      'WithStatement',
    ],
    'prettier/prettier': [
      'error',
      {
        semi: true,
        trailingComma: 'all',
        singleQuote: true,
        arrowParens: 'always',
      },
    ],
    'lines-between-class-members': [
      'error',
      'always',
      { exceptAfterSingleLine: true },
    ],
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['.jsx', '.tsx'],
      },
    ],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-var-requires': 'off',
  },
  overrides: [
    {
      files: ['*.js', '*.jsx'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-unused-vars': 'off',
      },
    },
    {
      files: ['!src/server/**/*'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
};
