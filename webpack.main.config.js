const webpack = require('webpack');
const ThreadsPlugin = require('threads-plugin');
module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './src/main.js',
  // Put your normal webpack config below here
  module: {
    rules: require('./webpack.rules'),
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
    }),
    new ThreadsPlugin({
      target: 'electron-node-worker',
    })
  ],
};
