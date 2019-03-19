export const name = "ESLint"
export const mainPackage = "eslint"
export const core = true
export const dependencies = []
export const devDependencies = [
  "eslint",
  "jest-runner-eslint"
]
export const configs = {
  package: {
    jest: {
      runner: "jest-runner-eslint",
      displayName: "lint",
      testMatch: ["<rootDir>/src/**/*.js"]
    }
  }
}
