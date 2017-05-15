'use strict';

module.exports = function({ env }) {
  return {
    hints: (env === 'production' ? 'warning': false)
  };
};
