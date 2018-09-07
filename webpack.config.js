var path = require('path');

module.exports = {
	entry: './src/index.js',

	output: {
		path: __dirname + '/public/',
		filename: 'bundle.js'
	},

	module: {
		loaders: [
			{
				test: /\.js$/,
				loaders: ['babel-loader?' + JSON.stringify({
					cacheDirectory: true,
					presets: ['es2015', 'react']
				})],
				exclude: /node_module/,
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
		root: path.resolve('./src')
	}
}
