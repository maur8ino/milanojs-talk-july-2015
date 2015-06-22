module.exports = function (config) {
  'use strict';
  config.set({

    basePath: '',

    frameworks: ['mocha', 'browserify'],

    files: [
      'src/**/*.js',
      'test/**/*-test.js'
    ],

    preprocessors: {
      'src/**/*.js': 'browserify',
      'test/**/*-test.js': 'browserify'
    },

    browserify: {
      debug: true,
      transform: ['babelify']
    },

    reporters: ['mocha'],

    port: 9876,
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    browsers: ['Chrome'],

    //autoWatch: true,
    singleRun: true
  });
};
