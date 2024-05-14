module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    "<rootDir>/app/javascript/components/**",
    "<rootDir>/app/javascript/routes/**",
  ],
  coverageThreshold: {
    global: {
      lines: 90,
    },
  },
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/app/javascript/setupTests.jsx"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  coveragePathIgnorePatterns: [
    "<rootDir>/app/javascript/components/App.jsx",
    "<rootDir>/app/javascript/components/index.jsx",
    "<rootDir>/app/javascript/routes/index.jsx",
  ],
};
