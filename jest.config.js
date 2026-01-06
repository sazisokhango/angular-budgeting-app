export default {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    testEnvironment: 'jsdom',
    testMatch: ['**/?(*.)+(spec).ts'],
    transform: {
      '^.+\\.(ts|js|html)$': [
        'ts-jest',
        {
          tsconfig: '<rootDir>/tsconfig.spec.json',
          stringifyContentPathRegex: '\\.html$'
        }
      ]
    },
    moduleFileExtensions: ['ts', 'html', 'js', 'json'],
    transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)']
  };
  