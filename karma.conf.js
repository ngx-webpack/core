'use strict';

let path = require('path');
let webpackConfig = require('./webpack.config');
let polyfills = [
  'ts-helpers',
  'core-js/client/shim',
  'zone.js/dist/zone',
  'zone.js/dist/long-stack-trace-zone',
  'zone.js/dist/async-test',
  'zone.js/dist/fake-async-test',
  'zone.js/dist/sync-test',
  'zone.js/dist/proxy',
  'zone.js/dist/jasmine-patch'
];

let karmaGenerator = function(webpackConfig, { useDlls }) {
  let testFile = { pattern: 'src/app/test.ts' };
  let dllFile = { pattern: 'src/dll/angular.dll.js' };

  let polyfillFiles = polyfills
    .map(file => {
      return { pattern: require.resolve(file) };
    });

  let files = useDlls
    ? polyfillFiles.concat([dllFile, testFile])
    : polyfillFiles.concat([testFile]);

  return {
    basePath: process.cwd(),

    frameworks: ['jasmine'],

    files,

    preprocessors: {
      'src/app/test.ts': ['webpack', 'sourcemap']
    },

    reporters: ['dots'],

    webpack: webpackConfig,
    webpackServer: { noInfo: true },

    port: 9876,

    colors: true,

    logLevel: 'INFO',

    browsers: ['PhantomJS'],

    autoWatch: true,
    singleRun: false
  };
};

module.exports = (config) => {
  config.set(
    karmaGenerator(webpackConfig, { useDlls: true })
  );
};
