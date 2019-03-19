import fs from "fs"
import keyBy from "lodash/keyBy"

export const getConfigurers = () =>
  keyBy(
    fs.readdirSync(__dirname)
      .filter(path => !path.endsWith("index.js"))
      .map(path => require(`./${path}`)),
    "name"
  )
