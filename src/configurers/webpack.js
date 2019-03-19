import prettier from "prettier"

import { join } from "path"
import fs from "fs"
import util from "util"

import { decode } from "../helpers/code"

const WEBPACK_CONFIG_PATH = join(process.cwd(), "webpack.config.js")

export const name = "webpack"
export const filename = "webpack.config.js"
export const update = config => {
  const imports = ['const path = require("path");']

  const code = imports.join("\n") + 
    "\n" +
    "module.exports = " + decode(util.inspect(config, { depth: null, breakLength: 120 }))

  fs.writeFileSync(WEBPACK_CONFIG_PATH, prettier.format(code, { parser: "babel" }))
}
