const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
// const postcssAssets = require('postcss-assets');
// const postcssNext = require('postcss-cssnext');
// const stylelint = require('stylelint');
const ManifestPlugin = require('webpack-manifest-plugin');
// const autoprefixer = require('autoprefixer');

const config = {
  mode: 'development',
  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',

  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [path.resolve(__dirname), 'node_modules', 'app', 'app/redux'],
  },

  entry: {
    app: [
      'babel-polyfill',
      'webpack/hot/dev-server',
      './src/client.jsx',
    ],
  },

  output: {
    path: path.resolve('./build'),
    publicPath: 'http://localhost:8080/',
    filename: 'js/[name].js',
    // pathinfo: true,
  },

  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: 'babel-loader' },
      {
        test: /\.(css|scss)$/,
        include: path.resolve('./src/app'),
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true,
              // modules: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
            // If you are having trouble with urls not resolving add this setting.
            // See https://github.com/webpack-contrib/css-loader#url
              sourceMap: true,
              modules: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.eot(\?.*)?$/,
        use: [{ loader: 'file-loader?name=fonts/[hash].[ext]' }],
      },
      {
        test: /\.(woff|woff2)(\?.*)?$/,
        use: [{ loader: 'file-loader?name=fonts/[hash].[ext]' }],
      },
      {
        test: /\.ttf(\?.*)?$/,
        use: [{ loader: 'url-loader?limit=10000&mimetype=application/octet-stream&name=fonts/[hash].[ext]' }],
      },
      {
        test: /\.svg(\?.*)?$/,
        use: [{ loader: 'url-loader?limit=10000&mimetype=image/svg+xml&name=fonts/[hash].[ext]' }],
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [{ loader: 'url-loader?limit=1000&name=images/[hash].[ext]' }],
      },
    ],
  },

  plugins: [
    new ManifestPlugin({
      fileName: './manifest.json',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        BROWSER: JSON.stringify(true),
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};

const createIfDoesntExist = (dest) => {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest);
  }
};

createIfDoesntExist('./build');
createIfDoesntExist('./build/public');

module.exports = config;
