'use strict';

let path = require('path');

module.exports = function(config) {
  let entry = require('./entry')(config);
  let output = require('./output')(config);
  let rules = require('./rules')(config);
  let plugins = require('./plugins')(config);
  let devtool = require('./devtool')(config);
  let devServer = require('./dev-server')(config);
  let performance = require('./performance')(config);

  let webpackConfig = {
    context: path.join(process.cwd(), 'src'),

    resolve: require('./resolve'),

    stats: require('./stats'),

    node: require('./node'),

    plugins,

    module: { rules },

    devtool,

    performance
  };

  if (config.env === 'production') {
    return Object.assign({ entry, output }, webpackConfig);
  } else if (config.env === 'test') {
    return Object.assign({}, webpackConfig);
  } else if (config.env === 'install') {
    return Object.assign({ entry, output }, webpackConfig);
  } else {
    return Object.assign({ entry, output, devServer }, webpackConfig);
  }
};
