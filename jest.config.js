module.exports = {
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/{server,utils}/**/*.{js,jsx,ts,tsx}'],
  coverageReporters: ['text'],
  testMatch: ['**/test/**/*.js'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.(t|j)sx?$': 'babel-jest',
  },
};
