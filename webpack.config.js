const path = require("path")

module.exports = {
  target: "node",
  entry: {
    app: "./src/index.js"
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "boilerplate.js"
  }
}
