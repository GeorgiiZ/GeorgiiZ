import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  modulePathIgnorePatterns: ['<rootDir>/test.ts'],
};

export default config;
