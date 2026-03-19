module.exports = {
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx,jsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{ts,tsx}'
  ],
  coverageReporters: ['cobertura', 'json', 'html', 'lcov'],
  modulePaths: ['<rootDir>/src'],
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss|png|jpg|gif|ttf|woff|woff2)$": "identity-obj-proxy"
  },
  setupFiles: ['<rootDir>/config/jest/env-setup.ts'],
  setupFilesAfterEnv: ['<rootDir>/config/jest/setup.ts'],
  testRegex: ['src/.+\\.(test|spec)\\.(j|t)sx?$'],
  testEnvironment: 'jsdom',
  transformIgnorePatterns: ['node_modules/(?!@digital-hig/theme-mui)'],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ]
};
