

var webpack = require('webpack');
var path = require('path');

module.exports = {
	entry:'./src/main.js',
	module:{
		rules:[{
				test:/\.js$/,
				loader:'babel-loader',
				query:{presets:['es2015']}
			},
			{test:/\.css$/,loader:'style-loader!css-loader'},
			{test:/\.(png|jpg)$/,loader:'url-loader?limit=8192'}
		]
	},
	plugins:[
		new webpack.HotModuleReplacementPlugin()
	],
	devServer:{
		contentBase: path.join(__dirname, 'dist'),
		compress: false,
		inline: true,
		hot: true,
		port: 8099
	},
	resolve:{
		extensions:['.js','.vue']
	},
	output:{
		filename:'./dist/bundle.js'
	}
}
