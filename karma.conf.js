'use strict';

let karmaGenerator = require('ngx-karma').karma;
let webpackConfig = require('./webpack.config');
let Config = require('./lib/config');
let config = new Config();

let { singleRun, useDlls } = config.calculate();
let karmaConfig = karmaGenerator(webpackConfig, { singleRun, useDlls });

module.exports = (config) => {
  config.set(karmaConfig);
};
