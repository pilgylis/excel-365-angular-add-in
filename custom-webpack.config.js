const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    polyfills: './src/polyfills.ts',
    main: './src/main.ts',
    taskpane: './src/taskpane.ts',
    commands: './src/commands.ts'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "taskpane.html",
      template: "./src/taskpane.html",
      chunks: ["runtime", "polyfills", "styles", "vendor", "taskpane"]
    }),
    new HtmlWebpackPlugin({
      filename: "commands.html",
      template: "./src/commands.html",
      chunks: ["commands"]
    })
  ]
};
