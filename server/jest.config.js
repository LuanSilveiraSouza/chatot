module.exports = {
  bail: 1,
  clearMocks: true,
  preset: "ts-jest",
  testEnvironment: "node",
  globals: {
    "ts-jest": {
      tsConfigFile: "./tsconfig.json",
    },
  },
  testMatch: ["./**/*.test.ts"],
  collectCoverage: true,
  collectCoverageFrom: ["./src/**"],
  coverageDirectory: "./__tests__/coverage",
  coverageProvider: "v8",
};
