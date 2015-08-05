var webpack = require('webpack');

module.exports = function (config) {
  config.set({
    browsers: [ 'PhantomJS' ],

    singleRun: false, //just run once by default

    frameworks: ['mocha', 'chai'],

    files: [
      './specs.webpack.js'
    ],
    plugins: [
      'karma-phantomjs-launcher',
      'karma-chai',
      'karma-mocha',
      'karma-sourcemap-loader',
      'karma-webpack',
    ],

    preprocessors: {
      './specs.webpack.js': [ 'webpack', 'sourcemap' ]
    },

    reporters: [ 'dots' ],

    webpack: require('./webpack.test.config.js'),

    webpackServer: {
      noInfo: true //please don't spam the console when running in karma!
    }
  });
};
