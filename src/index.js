import deepmerge from "deepmerge"
import inquirer from "inquirer"

import { spawnSync } from "child_process"
import fs from "fs"
import intersection from "lodash/intersection"
import isFunction from "lodash/isFunction"
import uniq from "lodash/uniq"

import { getChoices, getCorePackages } from "./packages"
import { getConfigurers } from "./configurers"

async function run() {
  const { packages: optionalPackages } = await inquirer.prompt([
    {
      type: "checkbox",
      name: "packages",
      message: "Which packages would you like included?",
      choices: getChoices()
    }
  ])

  const packages = [
    ...getCorePackages(),
    ...optionalPackages
  ]

  const packageNames = packages.map(({ name }) => name)
  const getValues = attribute => isFunction(attribute)
    ? attribute(packageNames).filter(a => !!a)
    : attribute

  const settings = deepmerge.all(
    packages
      .map(({ 
        dependencies,
        devDependencies,
        configs
      }) => ({
        dependencies: getValues(dependencies),
        devDependencies: getValues(devDependencies),
        configs: getValues(configs),
      })),
    { arrayMerge: (a, b) => uniq([...a, ...b]) }
  )


  let result

  console.log(":: Adding dependencies...")
  result = spawnSync("yarn", ["add", ...settings.dependencies])
  if( result.error ) throw result.error
  console.log(":: Dependencies added")


  console.log(":: Adding dev dependencies...")
  result = spawnSync("yarn", ["add", "--dev", ...settings.devDependencies])
  if( result.error ) throw result.error
  console.log(":: Dev dependencies added")


  console.log(":: Populating configs...")
  const configurers = getConfigurers()
  const configsToUpdate = intersection(
    Object.keys(settings.configs),
    Object.keys(configurers)
  )

  configsToUpdate.forEach(config => {
    const configurer = configurers[config]
    console.log(`   > ${configurer.filename}`)
    configurer.update(settings.configs[config])
  })

  console.log(":: Building out starting points")
  if( !fs.existsSync("src/") ) {
    console.log("   > src/")
    fs.mkdirSync("src")
  }

  console.log(packageNames)
  const extension = packageNames.includes("Typescript") ? ".tsx" : ".js"
  if( !fs.existsSync(`src/index${extension}`) )
    console.log(`   > src/index${extension}`)
    fs.writeFileSync(`src/index${extension}`, [
      `import * as React from "react"`,
      `import * as ReactDOM from "react-dom"`,
      ``,
      `import App from "./containers/App"`,
      ``,
      `ReactDOM.render(<App />, document.getElementById("app"))`
    ].join("\n"))




  console.log("Done!")

}


run()
