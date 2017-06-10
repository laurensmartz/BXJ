const path = require('path');
module.exports = {
	/*entry: {
		main: './src/main.js'
	},*/
	entry: __dirname + '/src/main.js',
	output: {
//		path: './dist/',
//		path: path.resolve(__dirname, 'dist'),
		path: __dirname + '/dist',
		filename: '[name].bundle.js',
//		publicPath: 'assets/'		//webpack-dev-server服务器资源文件的位置，在index.html里打包后的js文件所在目录（内存里）
	},
	module: {
		loaders: [
			{test: /\.css$/, loader: 'style-loader!css-loader'},
			{test: /\.vue$/, loader: 'vue-loader'},
			{test: /\.js$/, loader: 'babel-loader'},
			{test: /\.(eot|ttf)$/, loader: 'file-loader'},
			{test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
		]
	},
	devtool: 'eval-source-map',
	devServer: {
//		contentBase: './views_vue',
		inline: true //实时刷新
//		hot: true
	}
}