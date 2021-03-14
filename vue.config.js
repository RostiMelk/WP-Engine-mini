// const webpack = require('webpack');
module.exports = {
    publicPath: '/',
    outputDir: './dist/',

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
	}
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
	*/,

    pages: {
      popup: {
        template: 'public/browser-extension.html',
        entry: './src/popup/main.js',
        title: 'Popup'
      }
    },

    pluginOptions: {
      browserExtension: {
        componentOptions: {}
      }
    }
};
