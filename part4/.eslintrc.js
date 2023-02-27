module.exports = {
  env: { node: true, commonjs: true, es2021: true },
  extends: "eslint:recommended",
  overrides: [],
  parserOptions: { ecmaVersion: "latest" },
  rules: {
    eqeqeq: "error",
    indent: ["error", 2],
    "linebreak-style": ["error", "windows"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
  },
};
