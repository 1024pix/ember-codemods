module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es2020: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
  },
  extends: ['plugin:prettier/recommended'],
  plugins: [],
  // add your custom rules here
  rules: {},
  ignorePatterns: ['**/__testfixtures__/**'],
};
