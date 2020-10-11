require('dotenv').config()
const webpack = require('webpack');
const path = require('path');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

/*
 * We've enabled UglifyJSPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/uglifyjs-webpack-plugin
 *
 */

const { CheckerPlugin } = require('awesome-typescript-loader');
const CircularDependencyPlugin = require('circular-dependency-plugin');

/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

const PATHS = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist')
};

const html = PATHS.src + '/views/index.pug';

/*
*
* Inline Plugin
*
*/
const HtmlWebpackPlugin = require('html-webpack-plugin');
/*
//
// Clean Dist
//
*/

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const compileTemplate = (fileName) => {
  return new HtmlWebpackPlugin({
    template: PATHS.src + '/views/' + fileName + '.pug',
    filename: fileName + '.html',
    baseUrl: process.env.BASE_URL,
    template: html
  })
}

module.exports = {
  entry:
    PATHS.src + '/scripts/index.ts'
  ,

  output: {
    path: PATHS.dist
  },

  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [
          'pug-loader'
        ]
      },

      {
        test: /\.scss|css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
          }
        ]
      },

      {
        enforce: 'pre',
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },

      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /(node_modules)/
      }
    ]
  },

  resolve: {
    extensions: ['.ts', '.js']
  },

  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new CleanWebpackPlugin({
      dry: true,
      cleanOnceBeforeBuildPatterns: PATHS.dist
    }
    ),
    new CheckerPlugin(),
    new CircularDependencyPlugin({
      cwd: process.cwd(),
      exclude: /a\.ts|node_modules/,
      failOnError: true
    }),
    new LiveReloadPlugin(),
    new BrowserSyncPlugin ({
      host: 'localhost',
      port: 3000,
      proxy: 'http://localhost:8081'
    }),
    compileTemplate('index'),
  ],

  mode: 'development',

  devServer: {
    contentBase: PATHS.dist,
    watchContentBase: true
  },

  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      name: false,

      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        }
      }
    }
  }
};
