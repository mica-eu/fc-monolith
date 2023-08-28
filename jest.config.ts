import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  transform: {
    '^.+\\.ts': 'ts-jest',
  },
  testPathIgnorePatterns: ['dist'],
  setupFiles: ['./jest.setup.ts'],
};

export default config;
