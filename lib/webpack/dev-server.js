'use strict';

module.exports = function({ port, liveReload }) {
  return {
    contentBase: './src',
    port,
    inline: liveReload,
    historyApiFallback: true,
    stats: 'errors-only',
    watchOptions: {
      aggregateTimeout: 300,
      poll: 500
    }
  };
};

