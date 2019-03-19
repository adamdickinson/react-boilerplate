import fs from "fs"

export const getPackages = () =>
  fs.readdirSync(__dirname)
    .filter(path => !path.endsWith("index.js"))
    .map(path => require(`./${path}`))

export const getCorePackages = () =>
  getPackages().filter(({ core }) => !!core)

export const getOptionalPackages = () =>
  getPackages().filter(({ core }) => !core)

export const getChoices = () =>
  getOptionalPackages().map(pack => ({
    name: `${pack.name} (${pack.mainPackage})`,
    value: pack
  }))
