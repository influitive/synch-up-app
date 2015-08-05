
function includePaths () {
  var paths = require('patternity').includePaths;

  return paths.map(function(p){
    return ["includePaths[]=", p].join('');
  }).join('&');
}

module.exports = {
  devtool: 'inline-source-map', //just do inline source maps instead of the default

  resolve: {
    root: __dirname,
    modulesDirectories: ['app/assets/javascripts', 'node_modules'],
    extensions: ['', '.js', '.jsx']
  },

  module: {
    loaders: [
      // Can't exclude /node_modules for jsx-loader as patternity has jsx in it
      // If this gets slow, a better exclude regex that includes patternity might help
      { test: /.jsx?$/, loader: 'jsx-loader' },
      { test: /.jsx?$/, exclude: /node_modules/, loader: "strict" },
      { test: /.scss$/, loader: "style!css!sass?" + includePaths() },
      { test: /.(?:ttf|woff2?|eot)$/, loader: 'url-loader?limit=10000' }
    ]
  }
};
