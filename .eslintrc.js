module.exports = {
  plugins: ['jsx-a11y', 'prettier', 'eslint-plugin-import-helpers'],
  extends: [
    'react-app',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:jsx-a11y/recommended',
    'prettier',
    'prettier/react',
  ],
  rules: {
    'no-console': ['warn', { allow: ['error', 'warn'] }],
    'no-unused-vars': [
      'warn',
      {
        vars: 'all',
        argsIgnorePattern: '^_',
        args: 'all',
        ignoreRestSibling: false,
      },
    ],
    'prefer-const': [
      'error',
      {
        destructuring: 'any',
      },
    ],
    'no-empty-function': 'error',
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['to'],
      },
    ],
    'import-helpers/order-imports': [
      'warn',
      {
        newlinesBetween: 'never',
        groups: [
          'module',
          '/^components/',
          '/^fonts/',
          '/^hooks/',
          '/^images/',
          '/^layouts/',
          '/^pages/',
          '/^routes/',
          '/^shared/',
          '/^public/',
          ['parent', 'sibling', 'index'],
        ],
        alphabetize: { order: 'asc', ignoreCase: true },
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
};
