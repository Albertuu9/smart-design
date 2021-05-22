module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],

  configureWebpack: {
    devtool: 'source-map',
  },

  devServer: {
    proxy: 'https://api.ipify.org/'
  },
  
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  }
}
