  
module.exports = {
  transpileDependencies: ['vuex-persist'],
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
}