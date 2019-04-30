module.exports = {
  testEnvironment: 'node',
  collectCoverage: true,
  coverageReporters: ['json', 'html'],
  roots: [
    '<rootDir>/src',
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '/__test__/.*\\.test\\.(ts|js)$',
  modulePathIgnorePatterns: [
    '/dist/*',
    '/__snapshots__/.*',
    '/*.mock.js',
    '/*.mock.ts',
    '/*.json',
    'type.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 60,
      statements: 60,
    },
  },
  moduleFileExtensions: [
    'ts',
    'js',
    'json',
    'node',
  ],
};
