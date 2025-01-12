import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest', // Use ts-jest preset for TypeScript support
    testEnvironment: 'jsdom', // Set up JSDOM environment for React component testing

    // Specify root directories for Jest to scan for tests
    rootDir: '../',

    // Define how test files are located
    testMatch: [
        '**/__tests__/**/*.[jt]s?(x)', // Match files in __tests__ folders
        '**/?(*.)+(spec|test).[tj]s?(x)', // Match *.spec.* or *.test.* files
    ],

    // Clear mocks between tests to avoid cross-test contamination
    clearMocks: true,

    // Configure how Jest transforms files
    transform: {
        '^.+\\.(ts|tsx|js|jsx)$': [
            'ts-jest',
            {
                tsconfig: 'jest/tsconfig.jest.json', // Use tsconfig.jest.json for Jest
            },
        ],
    },

    // Mock static assets like stylesheets and images
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock CSS imports
        '\\.(gif|ttf|eot|svg|jpg|png)$': '<rootDir>/__mocks__/fileMock.js', // Mock file imports if needed
    },

    // Coverage configuration
    collectCoverage: true,
    coverageDirectory: '<rootDir>/coverage',
    coverageProvider: 'v8',

    // Setup files for additional environment configuration
    setupFilesAfterEnv: ['@testing-library/jest-dom'],
    testPathIgnorePatterns: ['/node_modules/', 'mockDataFile.ts'],
};

export default config;
