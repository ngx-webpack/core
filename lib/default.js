'use strict';

module.exports = {
  env: 'development',
  port: 3000,
  outputDir: 'dist',
  templateFormat: 'html',
  styleFormat: 'css',
  aot: false,
  tsConfig: 'tsconfig.json',
  tsLint: 'tslint.json',
  liveReload: true,
  indexHtml: true,
  useHash: true,
  serviceWorker: true,
  staticFiles: [
    { from: 'assets', to: 'assets' }
  ],
  polyfills: [
    'ts-helpers',
    'core-js/client/shim',
    'zone.js/dist/zone',
    'zone.js/dist/long-stack-trace-zone'
  ],
  vendors: [
    '@angular/animations',
    '@angular/common',
    '@angular/core',
    '@angular/platform-browser',
    '@angular/http',
    'rxjs/Observable',
    'rxjs/Subject',
    'rxjs/ReplaySubject',
  ],
  useDlls: true,
  dlls: [
    '@angular/compiler',
    '@angular/platform-browser-dynamic'
  ]
};
