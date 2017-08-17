'use strict';

module.exports = function({ env, dlls, polyfills, vendors }) {
  if (env === 'install') {
    return {
      angular: polyfills.concat(dlls)
    };
  }

  const entries = {
    main: './app/main.ts'
  };

  if (vendors !== false) {
    entries.vendor = polyfills.concat(vendors, dlls);
  }

  return entries;
};
