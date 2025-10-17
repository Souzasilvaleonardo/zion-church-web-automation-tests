const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://klema-web-env-hml-zion-church.vercel.app',
    experimentalSessionAndOrigin: false,
  },
  fixturesFolder: 'cypress/fixtures',
  video: false,
})

