module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["./spec/setup-tests.ts"],
  globals: {
    "ts-jest": {
      "tsConfig": "<rootDir>/tsconfig.json",
      "diagnostics": false
    }
  },
  testRegex: "/spec/.*\\.spec\\.ts$",
  moduleFileExtensions: ["ts", "js", "node"]
};
