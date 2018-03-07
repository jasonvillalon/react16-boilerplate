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
    rules: [{
      test: /\.(jpe?g|png|gif)$/i,
      use: 'url-loader?limit=1000&name=images/[hash].[ext]',
    },
    {
      test: /\.(jsx|js)$/,
      use: 'babel-loader',
    },
    {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      use: 'url-loader?limit=10000&mimetype=application/font-woff',
    },
    {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      use: 'file-loader',
    },
    {
      test: /\.(css|scss)$/,
      use: [
        'isomorphic-style-loader',
        'css-loader?modules&importLoaders=2&localIdentName=[local]___[hash:base64:5]',
        {
          loader: 'sass-loader',
        },
      ],
    },
    // {
    //   test: /\.scss$/,
    //   use: [{
    //     loader: 'style-loader', // creates style nodes from JS strings
    //   }, {
    //     loader: 'css-loader', // translates CSS into CommonJS
    //   }, {
    //     loader: 'sass-loader', // compiles Sass to CSS
    //   }],
    // },
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
