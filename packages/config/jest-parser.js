module.exports = {
  ...require("./jest-common"),
  testEnvironment: "node",
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  collectCoverageFrom: ["src/**/*.{js}"],
  moduleFileExtensions: ["js", "json"],
  transform: {
    "^.+\\.js$": "esbuild-jest",
  },
  coveragePathIgnorePatterns: [],
  coverageThreshold: null,
};
