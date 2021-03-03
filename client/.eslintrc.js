module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "airbnb"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "class-methods-use-this": "off",
    "react/prop-types": "off",
    "import/no-unresolved": "off",
    "no-restricted-syntax": "off",
    "react/jsx-props-no-spreading": "off",
    "react/forbid-prop-types": "off",
    "react/require-default-props": "off",
    "no-restricted-properties": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-one-expression-per-line": "off",
    "object-curly-newline": "off",
    "no-param-reassign": "off",
    "no-plusplus": "off",
    quotes: [2, "double"],
  },
};
