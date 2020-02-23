module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['./projects/mobx-angular/setup-tests.ts'],
  globals: {
    'ts-jest': {
      tsConfig: './projects/mobx-angular/tsconfig.spec.json',
      diagnostics: false
    }
  },
  testRegex: '/.*\\.spec\\.ts$',
  moduleFileExtensions: ['ts', 'js', 'node']
};
