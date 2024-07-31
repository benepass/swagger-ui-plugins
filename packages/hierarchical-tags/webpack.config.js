const path = require("path");

module.exports = {
  entry: "./src/index.jsx",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "index.js",
    library: "@benepass/swagger-ui-plugin-hierarchical-tags", // Optional, provide a name for your library
    libraryTarget: "umd", // Universal Module Definition, to support CommonJS, AMD and browser globals
    globalObject: "this", // Use 'this' instead of 'window' to support Node.js
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: [
              "@babel/plugin-transform-runtime", // Optional, helps with polyfilling
            ],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  externals: {
    react: {
      commonjs: "react",
      commonjs2: "react",
      amd: "react",
      root: "React",
    },
  },
};
