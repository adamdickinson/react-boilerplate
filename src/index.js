#!/usr/bin/env node

import chalk from "chalk"
import clear from "clear"
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
  const log = (message, depth=0) => {
    const leader = depth ? chalk.bold.blue("   > ") : chalk.bold.green(":: ")
    console.log(leader + message)
  }

  clear()
  console.log(chalk.bold("Renegade React Boilerplate") + "\n")

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

  log("Adding dependencies...")
  result = spawnSync("yarn", ["add", ...settings.dependencies])
  if( result.error ) throw result.error


  log("Adding dev dependencies...")
  result = spawnSync("yarn", ["add", "--dev", ...settings.devDependencies])
  if( result.error ) throw result.error


  log("Populating configs...")
  const configurers = getConfigurers()
  const configsToUpdate = intersection(
    Object.keys(settings.configs),
    Object.keys(configurers)
  )

  configsToUpdate.forEach(config => {
    const configurer = configurers[config]
    log(configurer.filename, 2)
    configurer.update(settings.configs[config])
  })

  log("Building out starting points")
  if( !fs.existsSync("src/") ) {
    log("src/", 2)
    fs.mkdirSync("src")
  }

  const extension = packageNames.includes("Typescript") ? ".tsx" : ".js"
  if( !fs.existsSync(`src/index${extension}`) )
    log(`src/index${extension}`, 2)
    fs.writeFileSync(`src/index${extension}`, [
      `import * as React from "react"`,
      `import * as ReactDOM from "react-dom"`,
      ``,
      `import App from "./containers/App"`,
      ``,
      `ReactDOM.render(<App />, document.getElementById("app"))`
    ].join("\n"))

  log("Done!")
}


run()
