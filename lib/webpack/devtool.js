'use strict';

module.exports = function({ env }) {
  if (env === 'test') {
    return 'inline-source-map';
  } else if (env === 'production') {
    return 'source-map';
  } else {
    return 'cheap-module-source-map';
  }
};
