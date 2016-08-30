/* eslint-disable */
// Reference: http://karma-runner.github.io/0.13/config/configuration-file.html
require('babel-register');

module.exports = function karmaConfig(config) {
  config.set({
    frameworks: [
      // Reference: https://github.com/karma-runner/karma-mocha
      // Set framework to mocha
      'mocha',

      // Reference: http://chaijs.com/api/bdd/
      // Use chai assertions
      'chai'
    ],

    client: {
      args: parseTestPattern(process.argv),
      mocha: {}
    },

    reporters: [
      // Reference: https://github.com/mlex/karma-spec-reporter
      // Set reporter to print detailed results to console
      'spec',

      // Reference: https://github.com/karma-runner/karma-coverage
      // Output code coverage files
      'coverage'
    ],

    files: [
      // Reference: https://www.npmjs.com/package/phantomjs-polyfill
      // Needed because React.js requires bind and phantomjs does not support it
      'node_modules/phantomjs-polyfill/bind-polyfill.js',

      // Grab all files in the tests directory that contain _test.
      'tests/**/*_test.*'
    ],

    preprocessors: {
      // Reference: http://webpack.github.io/docs/testing.html
      // Reference: https://github.com/webpack/karma-webpack
      // Convert files with webpack and load sourcemaps
      'tests/**/*_test.*': ['webpack', 'sourcemap'],
      'src/**/*.*': 'coverage'
    },

    browsers: [
      // Run tests using PhantomJS
      'PhantomJS'
    ],

    singleRun: true,

    // Configure code coverage reporter
    coverageReporter: {
      reporters: [
        // generates ./coverage/lcov.info
        {
          type: 'lcovonly',
          subdir: '.'
        },
        // generates ./coverage/coverage-final.json
        {
          type: 'json',
          subdir: '.'
        },
        // generates ./coverage/index.html
        {
          type: 'html',
          subdir: '.'
        }
      ]
    },

    // Test webpack config
    webpack: require('./webpack.config.babel'),

    // Hide webpack build information from output
    webpackMiddleware: {
      noInfo: true
    }
  });
};

function parseTestPattern(argv) {
  var found = false;
  var pattern = argv.map(function(v) {
    if (found) {
      return v;
    }

    if (v === '--') {
      found = true;
    }
  }).
  filter(function(a) { return a }).
  join(' ');

  return pattern ? ['--grep', pattern] : [];
}
