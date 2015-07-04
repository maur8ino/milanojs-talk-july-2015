var expect = require('chai').expect;
var webdriver = require("selenium-webdriver");

module.exports = function() {
  this.World = require('../support/world.js').World;

  this.Given(/^I go on the website "([^"]*)"$/, function(url, next) {
    this.driver.get(url);
    next();
  });

  this.Then(/^I should see an input$/, function (next) {
    var elementCssLocator = '.username input';
    this.waitFor(elementCssLocator);
    this.driver.findElements({ css: elementCssLocator }).then(function(elements) {
      expect(elements.length).to.not.equal(0);
      next();
    });
  });

  this.Then(/^I enter "([^"]*)" in the input and press Enter$/, function (username, next) {
    var elementCssLocator = '.username input';
    this.find(elementCssLocator).sendKeys(username);
    this.find(elementCssLocator).sendKeys(webdriver.Key.ENTER).then(next);
  });

  this.Then(/^I should see a select$/, function (next) {
    var elementCssLocator = '.repos-list select';
    this.waitFor(elementCssLocator);
    this.driver.findElements({ css: elementCssLocator }).then(function(elements) {
      expect(elements.length).to.not.equal(0);
      next();
    });
  });

  this.Then(/^I select the (first|second|third) option and press Enter$/, function (option, next) {
    var index = option === 'third' ? 3 : (option === 'second' ? 2 : 1);
    this.find('.repos-list option:nth-child(' + index + ')').click();
    this.find('.repos-list button').click();
    next();
  });

  this.Then(/^I should see some info about the repository$/, function (next) {
    var elementCssLocator = 'ul.repo-info';
    this.waitFor(elementCssLocator);
    this.driver.findElements({ css: elementCssLocator }).then(function(elements) {
      expect(elements.length).to.not.equal(0);
      next();
    });
  });
};
