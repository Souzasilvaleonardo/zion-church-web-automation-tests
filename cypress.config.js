const { defineConfig } = require('cypress');


module.exports = defineConfig({
  projectId: "goeh8p",
  e2e: {
    baseUrl: 'https://dev.zionglobal.app',
    // experimentalSessionAndOrigin: false,
    experimentalPromptCommand: true,
  },
  fixturesFolder: 'cypress/fixtures',
  video: false,
});