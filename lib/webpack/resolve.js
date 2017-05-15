'use strict';

let path = require('path');

module.exports = {
  modules: [
    path.join(process.cwd(), 'src'),
    'node_modules'
  ],
  extensions: ['.ts', '.js', '.json']
};
