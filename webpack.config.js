const webpack = require('webpack');
const path = require('path');

/*
 * We've enabled UglifyJSPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/uglifyjs-webpack-plugin
 *
 */

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

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

/*
*
* Inline Plugin
*
*/
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const cssPreprocessorLoader = { loader: 'fast-sass-loader'};
/*
//
// Clean Dist
//
*/

const CleanPlugin = require('clean-webpack-plugin');

module.exports = {
	entry:
		PATHS.src + '/scripts/index.tsx'
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
					'sass-loader'
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
		extensions: ['.tsx', '.js']
	},

	plugins: [
		new CleanPlugin(PATHS.dist),
		new UglifyJSPlugin(),
		new CheckerPlugin(),
		new CircularDependencyPlugin({
			exclude: /a\.ts|node_modules/,
			failOnError: true,
			cwd: process.cwd()
		}),
		new HtmlWebpackPlugin({
			template: PATHS.src + '/views/index.pug',
			inlineSource: '.(js|css)'
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
