import deepmerge from "deepmerge"

import { join } from "path"
import fs from "fs"
import uniq from "lodash/uniq"

const PACKAGE_JSON_PATH = join(process.cwd(), "package.json")

export const name = "package"
export const filename = "package.json"
export const update = config => {
  let packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, "utf-8"))
  packageJson = deepmerge(packageJson, config, { arrayMerge: (a, b) => uniq([...a, ...b]) })
  fs.writeFileSync(PACKAGE_JSON_PATH, JSON.stringify(packageJson, null, 2))
}
