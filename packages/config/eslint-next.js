module.exports = {
  parserOptions: {
    ecmaFeatures: { jsx: true },
  },
  env: {
    browser: true,
    node: true,
  },
  plugins: ['@typescript-eslint', 'simple-import-sort', 'import-name'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:tailwind/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'next',
    'prettier',
  ],
  rules: {
    // eslint:recommended
    'no-console': ['warn', { allow: ['error'] }],

    // plugin:import
    'import/named': 'off',

    // simple-import-sort
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // React and Next come first
          ['^(react|next)$'],
          // External packages.
          ['^@?\\w'],
          // Internal packages.
          ['^(@|@src|@root)(/.*|$)'],
          // Side effect imports.
          ['^\\u0000'],
          // Other relative imports. Put same-folder imports and `.` last.
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          // Parent imports. Put `..` last.
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Style imports.
          ['^.+\\.s?css$'],
        ],
      },
    ],

    '@next/next/no-html-link-for-pages': 'off',

    'import-name/default-import-name': ['error', { classnames: 'cx' }],

    // react
    'react/jsx-key': 'error',
    'react/jsx-no-target-blank': 'warn',
    'react/no-deprecated': 'warn',
    'react/no-unknown-property': 'error',
    'react/react-in-jsx-scope': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/function-component-definition': [
      0,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
      },
    ],
  },
  settings: {
    next: {
      rootDir: ['apps/*/', 'packages/*/'],
    },
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
      extends: ['plugin:testing-library/react', 'plugin:jest/recommended'],
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
    {
      files: ['*.tsx', '*.ts'],
      rules: { complexity: ['error', 16] },
    },
  ],
  ignorePatterns: ['node_modules', '.next', 'public', '.turbo', 'coverage', '__generated__/**/*', '**/*.d.ts'],
};
