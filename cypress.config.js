const { defineConfig } = require('cypress');

module.exports = defineConfig({
  reporter: 'junit',
  reporterOptions: {
    mochaFile: './cypress/reports/junit-results.[hash].xml',
    toConsole: false,
  },

  component: {
    watchForFileChanges: false,
    specPattern: ['./playground/**/*.cy.js'],
    devServer: {
      framework: 'react',
      bundler: 'webpack',
      webpackConfig: require('./webpack.ethers.config'),
    },
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config);
      return config;
    },
  },

  e2e: {
    watchForFileChanges: false,
    specPattern: ['./cypress/**/*.e2e.js'],
    baseUrl: 'http://127.0.0.1:3000',
    setupNodeEvents(on, config) {
      if (process.env.CI) {
        on('before:browser:launch', require('./cypress/lib/printBrowserLogs').printBrowserLogs);
      }
      require('@cypress/code-coverage/task')(on, config);
      on('task', {
        ...require('./cypress/tasks/setEthBalance'),
        ...require('./cypress/tasks/createAccount'),
      });

      return config;
    },

    retries: {
      runMode: 1,
      openMode: 0,
    },
    defaultCommandTimeout: 90_000,
    execTimeout: 120_000,
    taskTimeout: 300_000, // sometimes Anvil needs quite a bit of time to complete impersonating tx
  },
});
