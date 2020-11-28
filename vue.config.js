module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],

  devServer: {
    proxy: 'http://localhost:8080'
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
