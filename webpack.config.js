// Inside of webpack.config.js:
const WorkboxPlugin = require('workbox-webpack-plugin');
var path = require('path');

module.exports = {
  entry: './src/app.js',

  output: {
    filename: 'client.js',
    // path: './here'//path.join('public', 'javascripts')
    path: path.resolve(__dirname, 'public')

  },

  resolve: {
    extensions: ['.js', '.jsx']
  },
  mode: 'development',

  plugins: [
    // Other plugins...

    new WorkboxPlugin.InjectManifest({
      swSrc: './src/sw.js',
    })
  ]
};