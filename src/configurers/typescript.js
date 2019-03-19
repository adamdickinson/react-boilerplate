import deepmerge from "deepmerge"

import { join } from "path"
import fs from "fs"
import uniq from "lodash/uniq"

const TSCONFIG_JSON_PATH = join(process.cwd(), "tsconfig.json")

export const name = "typescript"
export const filename = "tsconfig.json"
export const update = config => {
  let tsconfigJson = fs.existsSync(TSCONFIG_JSON_PATH)
    ? JSON.parse(fs.readFileSync(TSCONFIG_JSON_PATH, "utf-8"))
    : {}

  tsconfigJson = deepmerge(tsconfigJson, config, { arrayMerge: (a, b) => uniq([...a, ...b]) })
  fs.writeFileSync(TSCONFIG_JSON_PATH, JSON.stringify(tsconfigJson, null, 2))
}
