/** @type {import('jest').Config} */
const config = {
  clearMocks: true,

  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.test.{js,jsx,ts,tsx}',
    '!src/**/__tests__/**',
    '!src/**/__mocks__/**',
    '!src/**/index.{js,ts}',
    '!src/index.{js,jsx,ts,tsx}',
  ],

  coverageDirectory: 'coverage',

  coverageProvider: 'v8',

  coverageReporters: ['text', 'lcov'],

  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.cjs',
    '\\.(woff|woff2|ttf|otf|png|jpg|jpeg|svg|svg)$':
      '<rootDir>/__mocks__/fileMock.cjs',
    '^shared(/?.*)$': '<rootDir>/src/shared$1',
    '^components(/?.*)$': '<rootDir>/src/components$1',
    '^pages(/?.*)$': '<rootDir>/src/pages$1',
    '^services(/?.*)$': '<rootDir>/src/services$1',
    '^images(/?.*)$': '<rootDir>/assets/images$1',
    '^fonts(/?.*)$': '<rootDir>/assets/fonts$1',
    '^styles(/?.*)$': '<rootDir>/assets/styles$1',
  },

  preset: 'ts-jest',

  roots: ['<rootDir>/src/'],

  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  testEnvironment: 'jsdom',

  transform: {},
}

export default config
