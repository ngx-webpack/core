'use strict';

let webpackGenerator = require('./lib/webpack');
let Config = require('./lib/config');
let defaultConfig = require('./lib/default');

let config = new Config();

module.exports = {
  webpack: function(options) {
    return webpackGenerator(config.calculate(options));
  },
  defaultConfig
};
