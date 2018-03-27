var webpack = require('webpack');
var path = require('path');

module.exports = {
	context:path.resolve(__dirname,'src'),
	entry:{
		main:'./main',
		login:'./modules/login',
		product:'./modules/product'
	},
	module:{
		rules:[{
				test: /\.js$/, 
				loader: 'babel-loader', 
				query:{presets:['es2015']}
			},
			{
				test:/\.css$/,
				loader:'style-loader!css-loader'
			},
			{test:/\.(png|jpg)$/,loader:'url-loader?limit=8192'}
		]
	},
	plugins: [
      new webpack.HotModuleReplacementPlugin()
  	],
	devServer:{
		contentBase: path.join(__dirname, 'dist'),
		compress: false,
		inline: true,
		port: 8080,
		hot:true
	},
	resolve: {
      extensions:  ['.js','.vue'] 
  	},
	output: {
		path:path.join(__dirname,'dist'),
		publicPath:'/',
		filename: '[name]-[hash:8].js',
		chunkFilename:'[id]-[chunkhash].js'
	}
}