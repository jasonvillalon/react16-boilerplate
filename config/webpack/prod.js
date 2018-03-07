const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
  filename: '[name].[contenthash].css',
  disable: process.env.NODE_ENV === 'development',
});

const config = {
  bail: true,
  mode: 'production',

  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [path.resolve(__dirname), 'node_modules', 'app', 'app/redux'],
  },

  entry: {
    app: ['babel-polyfill', './src/client.jsx'],
    vendor: [
      'history',
      'react',
      'react-dom',
      'react-router',
      'react-helmet',
      'react-redux',
      'react-router-redux',
      'redux',
      'redux-thunk',
    ],
  },

  output: {
    path: path.resolve('./build/public'),
    publicPath: '/public/',
    filename: 'js/[name].[chunkhash].js',
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        history: {
          name: 'history',
          test: 'history',
          enforce: true,
        },
        react: {
          name: 'react',
          test: 'react',
          enforce: true,
        },
        reactdom: {
          name: 'react-dom',
          test: 'react-dom',
          enforce: true,
        },
        reactrouter: {
          name: 'react-router',
          test: 'react-router',
          enforce: true,
        },
        reacthelmet: {
          name: 'react-helmet',
          test: 'react-helmet',
          enforce: true,
        },
        reactredux: {
          name: 'react-redux',
          test: 'react-redux',
          enforce: true,
        },
        reactrouterredux: {
          name: 'react-router-redux',
          test: 'react-router-redux',
          enforce: true,
        },
        redux: {
          name: 'redux',
          test: 'redux',
          enforce: true,
        },
        reduxthunk: {
          name: 'redux-thunk',
          test: 'redux-thunk',
          enforce: true,
        },
      },
    },
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [{ loader: 'babel-loader' }],
      },
      {
        test: /\.(css|scss)$/,
        use: extractSass.extract({
          use: [{
            loader: 'css-loader',
          }, {
            loader: 'sass-loader',
          }],
          // use style-loader in development
          fallback: 'style-loader',
        }),
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
    new webpack.optimize.OccurrenceOrderPlugin(),
    new ExtractTextPlugin('css/[name].[hash].css'),
    new ManifestPlugin({
      fileName: '../manifest.json',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        BROWSER: JSON.stringify(true),
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
};

const copySync = (src, dest, overwrite) => {
  if (overwrite && fs.existsSync(dest)) {
    fs.unlinkSync(dest);
  }
  const data = fs.readFileSync(src);
  fs.writeFileSync(dest, data);
};

const createIfDoesntExist = (dest) => {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest);
  }
};

createIfDoesntExist('./build');
createIfDoesntExist('./build/public');
copySync('./src/favicon.ico', './build/public/favicon.ico', true);

module.exports = config;
