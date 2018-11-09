var path = require('path');

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: "./src/index.js",
  output: {
    filename: 'bundle.js'
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: ["ts-loader"] }
    ]
  },
  devServer: {
    open: true,
    contentBase: path.join(__dirname, 'public'),
    port: 9000
  }
};
