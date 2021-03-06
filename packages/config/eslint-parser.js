module.exports = {
  env: {
    node: true,
    es6: true,
  },
  plugins: ["simple-import-sort", "prettier"],
  extends: ["eslint:recommended", "plugin:import/recommended"],
  rules: {
    // eslint:recommended
    "no-console": ["warn", { allow: ["error"] }],

    // eslint-plugin-prettier
    "prettier/prettier": "error",

    // plugin:import
    "import/named": "off",

    // simple-import-sort
    "simple-import-sort/exports": "error",
    "simple-import-sort/imports": [
      "error",
      {
        groups: [
          // External packages.
          ["^@?\\w"],
          // Internal packages.
          ["^(@|@src|@root)(/.*|$)"],
          // Side effect imports.
          ["^\\u0000"],
          // Other relative imports. Put same-folder imports and `.` last.
          ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
          // Parent imports. Put `..` last.
          ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
          // Style imports.
          ["^.+\\.s?css$"],
        ],
      },
    ],
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".graphql", ".js", ".jsx", ".svg"],
        paths: [".", "node_modules", "src"],
      },
    },
  },
  overrides: [
    {
      env: {
        jest: true,
      },
      files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
      extends: ["plugin:jest/recommended"],
      rules: {
        "import/no-extraneous-dependencies": [
          "off",
          { devDependencies: ["**/?(*.)+(spec|test).[jt]s?(x)"] },
        ],
        "@typescript-eslint/no-explicit-any": "off",
      },
    },
  ],
  ignorePatterns: [
    "node_modules",
    "dist",
    ".turbo",
    "coverage",
    "__generated__/**/*",
    "**/*.d.ts",
  ],
};
