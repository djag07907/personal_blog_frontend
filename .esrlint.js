module.exports = {
  root: true,
  extends: [
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["@typescript-eslint", "react", "react-hooks", "unused-imports"],
  parser: "@typescript-eslint/parser",
  rules: {
    // Coding style
    quotes: ["error", "single"],
    semi: ["error", "always"],
    "prefer-const": "error",
    "no-var": "error",
    "object-curly-spacing": ["error", "always"],

    // Best practices
    "@typescript-eslint/explicit-function-return-type": "warn",
    "@typescript-eslint/explicit-module-boundary-types": "warn",
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "unused-imports/no-unused-imports": "error",
    "no-console": ["warn", { allow: ["warn", "error"] }],

    // Optional: prevent use of `any`
    "@typescript-eslint/no-explicit-any": "warn",
  },
};
