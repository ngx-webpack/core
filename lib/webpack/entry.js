'use strict';

module.exports = function({ env, dlls, polyfills, vendors }) {
  if (env === 'install') {
    return {
      'angular': polyfills.concat(dlls)
    };
  }

  return {
    vendor: polyfills.concat(vendors, dlls),
    main: './app/main.ts'
  };
};
