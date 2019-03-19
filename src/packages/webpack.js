import { code } from "../helpers/code"

export const name = "Webpack"
export const mainPackage = "webpack"
export const core = true
export const dependencies = []
export const devDependencies = [
  "file-loader",
  "webpack",
  "webpack-cli",
  "webpack-dev-server"
]
export const configs = {
  package: {
    scripts: {
      build: "webpack --mode development", 
      finish: "webpack --mode production",
      start: "webpack-dev-server --mode development --host 0.0.0.0",
    }
  },
  webpack: {
    entry: "./src/index.js",

    output: {
      path: __dirname + "/build",
      publicPath: "/",
      filename: "bundle.js"
    },

    resolve: {
      extensions: [".js", ".jsx", ".json"]
    },

    devServer: {
      contentBase: `<CODE>path.resolve("build")<CODE>`,
      compress: true,
      headers: { "Access-Control-Allow-Origin": "*" },
      disableHostCheck: true,
      historyApiFallback: true
    },

    module: {
      rules: [
        {
          test: /\.(png|jpg|gif|svg|woff|woff2)$/,
          use: { loader: "file-loader" }
        }
      ]
    }
  }
}
