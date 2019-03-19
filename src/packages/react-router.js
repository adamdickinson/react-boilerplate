export const name = "React Router"
export const mainPackage = "react-router-dom"
export const dependencies = [
  "react-router-dom"
]
export const devDependencies = enabledPackages => [
  enabledPackages.includes("Typescript") && "@types/react-router",
  enabledPackages.includes("Typescript") && "@types/react-router-dom",
]
export const configs = {}
