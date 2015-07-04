'use strict';

var driver = require('./world.js').getDriver();

var myHooks = function () {

  this.After(function(scenario, callback) {
    this.driver.manage().deleteAllCookies()
        .then(function() {
          callback();
        });
  });

  this.registerHandler('AfterFeatures', function (event, callback) {
    driver.quit().then(callback);
  });

};

module.exports = myHooks;
