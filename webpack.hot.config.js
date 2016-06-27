var webpack = require('webpack');

var defaultEnv = new webpack.DefinePlugin({
  'process.env': {
    'NODE_ENV': '"development"'
  }
});

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
      'webpack-dev-server/client?http://localhost:8080/javascripts/',
      'webpack/hot/only-dev-server',
      './app.jsx'
    ]
  },

  // Note that in dev, `javascript_include_tag` will generate links like
  // /javascripts/app.js when Sprockets doesn't know about the file
  // and since webpack serves JS from memory (in dev mode), no file actually exists.
  // Thus we'll *not* use /assets but use /javascripts, even though
  // in production they'll be served from /assets (since real files get compiled there)
  output: {
    filename: '[name].js', // Will output app.js (for example with above entry)
    path: __dirname + '/app/assets/javascripts', // I don't think this matters since files aren't actually outputted??
    publicPath: 'http://localhost:8080/javascripts/' // Required for webpack-dev-server
  },

  // Require the webpack and react-hot-loader plugins
  plugins: [
    defaultEnv,
    new webpack.optimize.CommonsChunkPlugin({
      filename: 'common.js',
      name: 'common'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],

  resolve: {
    root: __dirname,
    modulesDirectories: ['app/assets/javascripts', 'node_modules'],
    extensions: ['', '.js', '.jsx']
  },

  module: {
    loaders: [
      { test: /\.jsx?$/, loaders: ['babel-loader'], exclude: '/node_modules/'},
      { test: /\.scss$/, loader: "style!css!sass?" + includePaths() },
      { test: /\.css/, loader: "style!css?" },
      { test: /\.(?:ttf|woff2?|eot)$/, loader: 'url-loader?limit=10000' }
    ]
  }
};
