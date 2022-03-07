module.exports = {
  env: {
    node: true,
  },
  plugins: ['@typescript-eslint', 'simple-import-sort'],
  extends: ['eslint:recommended', 'plugin:import/recommended', 'plugin:import/typescript', 'prettier'],
  rules: {
    // eslint:recommended
    'no-console': ['warn', { allow: ['error'] }],

    // plugin:import
    'import/named': 'off',

    // simple-import-sort
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.graphql', '.js', '.jsx', '.svg', '.ts', '.tsx'],
        paths: ['.', 'node_modules', 'src'],
      },
      typescript: {
        alwaysTryTypes: true,
        project: ['packages/*/tsconfig.json', 'apps/*/tsconfig.json', 'apps/*/tsconfig.lint.json'],
      },
    },
  },
  overrides: [
    {
      env: {
        jest: true,
      },
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:jest/recommended'],
      rules: {
        'import/no-extraneous-dependencies': ['off', { devDependencies: ['**/?(*.)+(spec|test).[jt]s?(x)'] }],
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      extends: ['plugin:@typescript-eslint/recommended'],
      rules: {
        // plugin:typescript-eslint
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            ignoreRestSiblings: true,
            argsIgnorePattern: '^(_|unused)',
            varsIgnorePattern: '^(_|unused|React)',
          },
        ],
      },
    },
  ],
  ignorePatterns: ['node_modules', 'dist', '.turbo', 'coverage', '__generated__/**/*', '**/*.d.ts'],
};
