'use strict';

module.exports = function({ env }) {
  let isProduction = env === 'production';

  return {
    debug: !isProduction,
    minimize: isProduction
  };
};
