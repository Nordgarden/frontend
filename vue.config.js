module.exports = {
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  },
  build: {
    extend: config => {
      const svgRule = config.module.rules.find(rule => rule.test.test('.svg'))

      // clear all existing loaders.
      // if you don't do this, the loader below will be appended to
      // existing loaders of the rule.
      svgRule.uses.clear()

      // add replacement loader(s)
      svgRule
        .use('svg-sprite-loader')
        .loader('svgo-loader')
        .loader('svg-sprite-loader')
    }
  }
}
