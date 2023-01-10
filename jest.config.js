module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['index.ts', '/node_modules/'],
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.[jt]s?(x)'],
  testTimeout: 60000,
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  transform: {
    '\\.(ts)$': 'ts-jest',
  },
};
