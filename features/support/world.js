var webdriver = require("selenium-webdriver");

var driver = new webdriver.Builder()
                          .withCapabilities(webdriver.Capabilities.chrome())
                          .build();

var World = function World(callback) {
  var defaultTimeout = 20000;

  this.driver = driver;

  this.waitFor = function(cssLocator, timeout) {
    var waitTimeout = timeout || defaultTimeout;
    return driver.wait(function() {
      return driver.isElementPresent({ css: cssLocator });
    }, waitTimeout);
  };

  this.find = function(cssLocator) {
    return driver.findElement({ css: cssLocator });
  };

  callback();
}
var getDriver = function() {
  return driver;
};

module.exports.World = World;
module.exports.getDriver = getDriver;
