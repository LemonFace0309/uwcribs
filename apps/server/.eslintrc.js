module.exports = {
  extends: '../../packages/config/eslint-server',
  ignorePatterns: ["**/__generated__/*"],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
  overrides: [
    {
      files: ['*.graphql'],
      parser: '@graphql-eslint/eslint-plugin',
      plugins: ['@graphql-eslint'],
      rules: {
        // '@graphql-eslint/no-unreachable-types': 'error',
        '@graphql-eslint/no-duplicate-fields': 'error',
      },
      parserOptions: {
        schema: './src/apollo/schema.graphql',
      },
    },
  ],
};
