'use strict';

let path = require('path');

module.exports = function(config) {
  if (config.env === 'install') {
    return {
      filename: '[name].dll.js',
      path: path.resolve(process.cwd(), 'src/dll'),
      library: '[name]_dll'
    };
  }

  let suffix = config.useHash ? '[hash]' : 'bundle';

  return {
    path: config.outputDir,
    filename: `[name].${suffix}.js`,
    sourceMapFilename: `[name].${suffix}.js.map`,
    chunkFilename: '[id].chunk.js'
  };
};
