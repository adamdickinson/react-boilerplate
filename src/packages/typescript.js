export const name = "Typescript"
export const mainPackage = "typescript"
export const dependencies = [
  "typescript"
]
export const devDependencies = enabledPackages => [
  "@types/react",
  "@types/react-dom",
  "awesome-typescript-loader",
  "source-map-loader",
  "ts-loader",
]
export const configs = {
  typescript: {
    compilerOptions: {
      esModuleInterop: true,
      outDir: "./build",
      sourceMap: true,
      noImplicitAny: true,
      module: "commonjs",
      target: "es2015",
      jsx: "react"
    },
    include: [
      "./src/**/*"
    ]
  },

  webpack: {
    entry: "./src/index.tsx",
    devtool: "source-map",
    resolve: {
      extensions: [".ts", ".tsx"]
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: { loader: "ts-loader" }
        },
        {
          enforce: "pre",
          test: /\.js$/,
          use: { loader: "source-map-loader" }
        }
      ]
    }
  }
}
