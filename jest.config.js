module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    "testPathIgnorePatterns": [
        "node_modules",
    ],
    "testMatch": [
        "**/tests/**/*.spec.(js|jsx|ts|tsx)"
    ],
    moduleFileExtensions: ["ts", "js"],
};
