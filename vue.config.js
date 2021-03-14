const webpack = require('webpack');
module.exports = {
	publicPath: process.env.NODE_ENV === 'production' ? '/dist/' : '/',
	outputDir: './dist/',
	indexPath: '../index.php',

	// css: {
	// 	sourceMap: true,
	// 	loaderOptions: {
	// 		// sass: {
	// 		// 	data: `
	// 		// 		@import "src/assets/styles/global";
	// 		// 	`
	// 		// }
	// 	}
	// },

	transpileDependencies: ['vuex-persist'],
	configureWebpack: {
		optimization: {
			splitChunks: false,
		},
		// plugins: [
		// 	new webpack.IgnorePlugin({
		// 		resourceRegExp: /^\.\/locale$/,
		// 		contextRegExp: /moment$/
		// 	})
		// ]
	},
	/*
	chainWebpack: config => {
		config.plugins.delete('prefetch')
		config
			.plugin('preload')
			.tap(args => {
			args[0].include = 'asyncChunks'
			return args
		})
	}
	*/
};
