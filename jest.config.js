module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv:['<rootDir>/src/__tests__/config/importJestDOM.ts'],
  moduleNameMapper:{
    "\\.(css|scss)$":"<rootDir>/src/__tests__/mocks/styleMock.ts"
  },
  testPathIgnorePatterns:["<rootDir>/src/__tests__/mocks", "<rootDir>/src/__tests__/config"]
};
