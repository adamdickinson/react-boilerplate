export const name = "Store"
export const mainPackage = "store"
export const dependencies = [
  "store"
]
export const devDependencies = enabledPackages => [
  enabledPackages.includes("Typescript") && "@types/store",
]
export const configs = {}
