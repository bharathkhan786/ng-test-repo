module.exports = {
  preset: 'jest-preset-angular',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  roots: ['<rootDir>/src'],
  moduleFileExtensions: ['ts', 'js', 'html'],
  transform: {
    '^.+\\.(ts|mjs|js|html)$': 'ts-jest'
  },
  transformIgnorePatterns: [
    'node_modules/(?!.*\\.(mjs|js)$)'
  ],
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/src/app/$1',
    '\\.(html|scss)$': '<rootDir>/__mocks__/fileMock.js'
  },
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage/jest',
  coverageReporters: ['json', 'lcov', 'text', 'html'],
  collectCoverageFrom: [
    'src/app/**/*.ts',
    '!src/main.ts',
    '!src/polyfills.ts',
    '!**/*.module.ts',
    '!**/*.spec.ts'
  ],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50
    }
  }
};
