const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const isProductionBuild = process.env.NODE_ENV !== 'local';
const isHot = !!process.env.HMR;
const devtool = process.env.WEBPACK_DEVTOOL || 'eval';

const clientPath = path.join(__dirname, 'client');
const buildPath = path.join(__dirname, './public');

const extractCss = new ExtractTextPlugin({
  filename: '[name].bundle.css',
  allChunks: true,
  disable: !isProductionBuild,
});

const extractLess = new ExtractTextPlugin({
  filename: '[name].css',
  allChunks: true,
  disable: !isProductionBuild,
});

const cssMinify = isProductionBuild ? {
  discardComments: {
    removeAll: true,
  },
} : false;

const eslintLoader = {
  enforce: 'pre',
  test: /\.js$/,
  loader: 'eslint-loader',
  exclude: /node_modules/,
};

const cssLoader = {
  test: /\.css$/,
  use: extractCss.extract({
    fallback: 'style-loader',
    use: [ {
      loader: 'css-loader',
      options: {
        minimize: cssMinify,
      },
    } ],
  }),
};

const lessLoader = {
  test: /\.less$/,
  use: extractLess.extract({
    fallback: 'style-loader',
    use: [ {
      loader: 'css-loader',
      options: {
        modules: true,
        importLoaders: 2,
        localIdentName: '[local]',
        minimize: cssMinify,
      },
    }, {
      loader: 'postcss-loader',
    }, {
      loader: 'less-loader',
      options: {
        modifyVars: {
          px: '1rem / 16',
        },
      },
    } ],
  }),
};

const babelLoader = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: 'babel-loader',
};

const urlLoader = {
  test: /\.(ttf|woff|woff2|svg|gif|cur|eot|png|jpg)$/,
  use: {
    loader: 'url-loader',
    options: {
      limit: 8192,
    },
  },
};

const rawLoader = {
  test: /\.(txt|md)$/,
  use: [ {
    loader: 'raw-loader',
  } ],
};

module.exports = {
  mode: isProductionBuild ? 'production' : 'development',
  devtool: !isProductionBuild && devtool,
  devServer: {
    hotOnly: true,
    port: 3000,
    public: 'localhost:3000/',
    publicPath: 'http://localhost:3000/',
  },
  entry: {
    app: [
      'babel-polyfill',
      'react-hot-loader/patch',
      './client/index',
    ],
  },
  output: {
    path: buildPath,
    publicPath: isHot ? 'http://localhost:3000/' : '/',
    filename: '[name].js',
    chunkFilename: '[name].bundle.js',
  },
  module: {
    rules: [
      eslintLoader,
      babelLoader,
      cssLoader,
      lessLoader,
      urlLoader,
      rawLoader,
    ],
  },
  resolve: {
    alias: {
      app: path.join(clientPath, 'app'),
      common: path.join(clientPath, 'common'),
      config: path.join(clientPath, 'config'),
      lib: path.join(clientPath, 'lib'),
      reducers: path.join(clientPath, 'reducers'),
      shared: path.resolve(__dirname, 'shared'),
    },
  },
  optimization: configureOptimization(),
  plugins: configurePlugins(),
};

function configureOptimization() {
  if (isProductionBuild) {
    return {
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              warnings: false,
              conditionals: true,
              unused: true,
              comparisons: true,
              sequences: true,
              dead_code: true,
              evaluate: true,
              if_return: true,
              join_vars: true,
            },
            output: {
              comments: false,
            },
          },
        }),
      ],
    };
  }
  return {};
}

function configurePlugins() {
  const plugins = [
    new webpack.DefinePlugin({
      IS_PRODUCTION_BUILD: isProductionBuild,
      'process.env.SCALE_MEDIUM': 'true',
      'process.env.SCALE_LARGE': 'false',
      'process.env.THEME_LIGHT': 'true',
      'process.env.THEME_LIGHTEST': 'false',
      'process.env.THEME_DARK': 'false',
      'process.env.THEME_DARKEST': 'false',
    }),
    extractCss,
    extractLess,
    new CopyWebpackPlugin([
      {
        from: 'client/images',
        to: 'images',
      },
    ]),
  ];

  if (isProductionBuild) {
    plugins.push(new webpack.optimize.AggressiveMergingPlugin());
    plugins.push(new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }));
  } else {
    plugins.push(new webpack.NamedModulesPlugin());
    plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  return plugins;
}
