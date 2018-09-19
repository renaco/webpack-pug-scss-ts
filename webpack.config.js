const webpack = require('webpack');
const path = require('path');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const CleanPlugin = require('clean-webpack-plugin');

const PATHS = {
  entries: path.join(__dirname, 'src/scripts'),
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist')
};

function compileTemplate(name) {
  return new HtmlWebpackPlugin({
    filename: name + '.html',
    template: PATHS.src + '/views/' + name + '.pug',
    inject: false
  })
}

module.exports = {
  entry: {
    index: PATHS.entries + '/index.ts',
    notFound: PATHS.entries + '/notFound.ts'
  },
  output: {
    path: PATHS.dist,
    filename: 'js/[name].js'
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
          'css-loader',
          'sass-loader',
          'style-loader'
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
        loader: 'awesome-typescript-loader',
        exclude: /(node_modules)/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    compileTemplate('index'),
    compileTemplate('404'),
    // new ExtractTextPlugin({
    //   filename: PATHS.dist + 'css/[name].css',
    //   allChunks: true
    // }),
    // new CleanPlugin(PATHS.dist),
    new UglifyJSPlugin(),
    new CheckerPlugin(),
    new CircularDependencyPlugin({
      exclude: /a\.ts|node_modules/,
      failOnError: true,
      cwd: process.cwd()
    }),
    new HtmlWebpackInlineSourcePlugin()
  ],
  mode: 'production',
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
