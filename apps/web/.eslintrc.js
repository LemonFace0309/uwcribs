module.exports = {
  extends: '../../packages/config/eslint-next',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
};
