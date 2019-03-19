export const name = "Apollo Client"
export const mainPackage = "apollo-client"
export const dependencies = [
  "apollo-client",
  "apollo-boost",
  "graphql",
  "graphql-hooks",
  "graphql-tag",
  "react-apollo",
  "react-apollo-hooks"
]
export const devDependencies = [
  "babel-plugin-import-graphql"
]
export const configs = {
  babel: {
    plugins: ["import-graphql"],
  },
  webpack: {
    module: {
      rules: [
        {
          test: /\.(graphql|gql)$/,
          exclude: /node_modules/,
          use: { loader: "graphql-tag/loader" }
        }
      ]
    }
  }
}
