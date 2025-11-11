const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    chromeWebSecurity: false,
    baseUrl: 'http://3.29.171.47:3000',
  },
})
