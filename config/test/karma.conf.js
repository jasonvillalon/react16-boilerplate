const path = require('path');
const webpack = require('webpack');
const postcssAssets = require('postcss-assets');
const postcssNext = require('postcss-cssnext');
const appConfig = require('../main');

module.exports = (config) => {
  const conf = {
    frameworks: ['mocha', 'chai', 'es6-shim'],

    browsers: ['PhantomJS'],

    files: ['../webpack/test.js'],

    preprocessors: {
      '../src/**/*.ts': ['sourcemap'],
      '../src/**/*.tsx': ['sourcemap'],
      '../webpack/test.js': ['webpack'],
    },

    plugins: ['karma-*'],

    reporters: ['mocha', 'coverage-istanbul'],

    coverageIstanbulReporter: {
      reports: ['text-summary'],
      fixWebpackSourcePaths: true,
      dir: 'coverage',
      'report-config': {
        html: {
          subdir: 'html',
        },
        lcov: {
          subdir: 'lcov',
        },
      },
    },

    hostname: appConfig.host,

    port: appConfig.karmaPort,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    singleRun: false,

    concurrency: Infinity,

    webpack: {
      devtool: 'inline-source-map',
      mode: 'development',
      resolve: {
        modules: [
          path.resolve(__dirname),
          '../../src',
          '../../src/app',
          '../../src/app/redux',
          'node_modules',
        ],
        extensions: ['.json', '.js', '.ts', '.tsx', '.jsx'],
      },

      module: {
        rules: [
          {
            test: /\.(js|jsx)?$/,
            use: [{ loader: 'babel-loader' }],
          },
          {
            test: /\.(jpe?g|png|gif)$/i,
            loader: 'url-loader?limit=1000&name=images/[hash].[ext]',
          },
          {
            test: /\.(css|scss)$/,
            include: path.resolve('./src/app'),
            use: [
              { loader: 'style-loader' },
              { loader: 'css-loader?modules&importLoaders=2&localIdentName=[local]___[hash:base64:5]' },
              {
                loader: 'postcss-loader',
                options: {
                  ident: 'postcss',
                  plugins: loader => [
                    require('postcss-import')({ root: loader.resourcePath }),
                    require('postcss-cssnext')(),
                    require('cssnano')(),
                  ],
                },
              },
              {
                loader: 'sass-loader',
              },
            ],
          },
        ],
      },

      externals: {
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': 'window',
      },

      plugins: [
        new webpack.LoaderOptionsPlugin({
          options: {
            tslint: {
              failOnHint: true,
            },
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
        new webpack.IgnorePlugin(/^fs$/),
        new webpack.IgnorePlugin(/^react\/addons$/),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
          'process.env': {
            BROWSER: JSON.stringify(true),
            NODE_ENV: JSON.stringify('development'),
          },
        }),
      ],
    },

    webpackServer: {
      noInfo: true,
    },
  };

  if (process.env.NODE_ENV === 'ci') {
    conf.autoWatch = false;
    conf.singleRun = true;
    conf.browsers.push('Firefox');
    conf.coverageIstanbulReporter.reports.push('lcov');
  } else {
    conf.coverageIstanbulReporter.reports.push('html');
    conf.browsers.push('Chrome');
  }

  config.set(conf);
};
