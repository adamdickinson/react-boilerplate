export const name = "Netlify"
export const mainPackage = "netlify-cli"
export const dependencies = [
  "netlify-cli"
]
export const devDependencies = []
export const configs = {
  package: {
    scripts: {
      deploy: "yarn finish && netlify deploy",
      ship: "netlify deploy --prod"
    }
  }
}
