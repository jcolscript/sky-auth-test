module.exports = {
  bail: 1,
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/app/**/*.js'],
  coverageDirectory: 'tests/coverage',
  coveragePathIgnorePatterns: ['\\\\node_modules\\\\', 'src/app/validators'],
  coverageReporters: ['text', 'lcov'],
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js?(x)'],
  transform: {
    '.(js|jsx|ts|tsx)': '@sucrase/jest-plugin',
  },
};
