const path = require("path");

module.exports = {
  devtool: "source-map",
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    port: 3000,
    contentBase: "./dist/",
    watchOptions: {
      poll: true,
    },
  },
};
