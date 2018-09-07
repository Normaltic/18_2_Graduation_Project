var lib_webpack = require('webpack');
var lib_path = require('path');

module.exports = {
	entry: [
		'./src/index.js',
		'webpack-dev-server/client?http://0.0.0.0:4848',
		'webpack/hot/only-dev-server'
	],

	output: {
		path: __dirname + '/public/',
		filename: 'bundle.js'
	},

	devServer: {
		inline: true,
		hot: true,
		host: "0.0.0.0",
		port: 4848,
		proxy: {
			"**": "http://0.0.0.0:4847"
		},
		disableHostCheck: true,
		contentBase: __dirname + '/public/',
		historyApiFallback: true
	},

	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					cacheDirectory: true,
					presets: ['es2015', 'react'],
					plugins: ['react-hot-loader/babel']
				}
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			},
			{
				test: /\.png$/,
				loader: 'url-loader'
			}
		]
	},

	resolve: {
		modules: [
			lib_path.resolve('./src'),
			lib_path.resolve('./node_modules')
		]
	},

	plugins: [
		new lib_webpack.HotModuleReplacementPlugin()
	]
}
