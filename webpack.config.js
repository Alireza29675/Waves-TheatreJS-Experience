var path = require('path');

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: "./src/index.js",
  output: {
    filename: 'bundle.js'
  },
  devServer: {
    open: true,
    contentBase: path.join(__dirname, 'public'),
    port: 9000
  }
};
