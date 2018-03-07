require('regenerator-runtime/runtime');

const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const postcssAssets = require('postcss-assets');
const postcssNext = require('postcss-cssnext');

const nodeModules = {};
fs.readdirSync('node_modules')
  .filter(x => ['.bin'].indexOf(x) === -1)
  .forEach((mod) => {
    nodeModules[mod] = `commonjs ${mod}`;
  });

const config = {
  externals: nodeModules,
  mode: 'development',
  target: 'node',

  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [path.resolve(__dirname), 'node_modules', 'app', 'app/redux'],
  },

  entry: ['babel-polyfill', './src/server.jsx'],

  output: {
    path: path.resolve('./build/public'),
    filename: '../server.js',
    publicPath: '/public/',
    libraryTarget: 'commonjs2',
  },

  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: 'babel-loader' },
      {
        test: /\.(css|scss)$/,
        include: path.resolve('./src/app'),
        use: [
          'isomorphic-style-loader',
          // 'css-loader?modules&importLoaders=2&localIdentName=[local]___[hash:base64:5]',
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
              modules: true,
              sourceMap: true,
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
    new webpack.LoaderOptionsPlugin({
      debug: false,
      options: {
        postcss() {
          return [
            postcssNext(),
            postcssAssets({
              relative: true,
            }),
          ];
        },
      },
    }),
  ],

  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },
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
