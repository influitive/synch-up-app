var webpack         = require('webpack');
var ManifestRevisionPlugin = require('manifest-revision-webpack-plugin');

var path = require('path');


function includePaths () {
  var paths = require('patternity').includePaths;

  return paths.map(function(p){
    return ["includePaths[]=", p].join('');
  }).join('&');
}

module.exports = {

  // Set 'context' for Rails Asset Pipeline
  context: __dirname + '/app/assets/javascripts',

  entry: {
    app: [
      './app.jsx'
    ]
  },

  output: {
    filename: '[name]-[chunkhash].js', // Will output app-<the-digest>.js
    path: __dirname + '/public/assets', // Save to Rails Asset Pipeline
    publicPath: '/assets/'
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      filename: 'common-[chunkhash].js',
      name: 'common'
    }),
    new ManifestRevisionPlugin(path.join(__dirname, 'public', 'assets', 'manifest.json'), {
        rootAssetPath: path.join(__dirname, 'public', 'assets'),
        format: 'rails'
    })
  ],

  resolve: {
    root: __dirname,
    modulesDirectories: ['app/assets/javascripts', 'node_modules'],
    extensions: ['', '.js', '.jsx']
  },

  module: {
    loaders: [
      { test: /\.jsx$/, loader: 'jsx-loader?harmony' },
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'strict' },
      { test: /\.scss$/, loader: "style!css!sass?" + includePaths() },
      { test: /\.css/, loader: "style!css?" },
      { test: /\.(?:ttf|woff2?|eot)$/, loader: 'url-loader?limit=10000' }
    ]
  }
};
