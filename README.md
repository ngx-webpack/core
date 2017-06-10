# @ngx-webpack/core
[![Build Status](https://travis-ci.org/ngx-webpack/core.svg?branch=master)](https://travis-ci.org/ngx-webpack/core)
[![Dependency Status](https://david-dm.org/ngx-webpack/core.svg)](https://david-dm.org/ngx-webpack/core)
[![devDependency Status](https://david-dm.org/ngx-webpack/core/dev-status.svg)](https://david-dm.org/ngx-webpack/core?type=dev)

Generates Webpack 2 configuration for development, testing and deployment.
It provides npm scripts also for running the configurations in different modes.

### Installation

```bash
npm install @ngx-webpack/core --save-dev
```

### Usage

Create ```webpack.config.js```.

```javascript
'use strict';
module.exports = require('@ngx-webpack/core').webpack();
```

### Modes

The generated configuration can fit different use cases based on environment variables or input parameters.

#### Development

Can bundle and serve the application with static assets. Refreshes bundle on changes.
Suitable for serving the files with `webpack-dev-server`.

It transpiles Typescript files from the main entry point (`src/app/main.ts`)
and exports global styles to a single file (`style.bundle.css`).
Can handle different types of templates (HTML, PUG) and styles (CSS, LESS, SASS) for components.
Supports Ahead-of-Time compilation.

Can be activated with 
`process.env.NODE_ENV = 'development''` or 
`process.env.npm_lifecycle_event = 'start'` or
`require('ngx-webpack').webpack({ env: 'development' });`

#### Testing

Suitable for usage with `karma` test runner.

Can be activated with 
`process.env.NODE_ENV = 'test''` or 
`process.env.npm_lifecycle_event = 'test*'` or
`require('@ngx-webpack/core').webpack({ env: 'test' });`

The configuration for `karma` can also be generated.

```javascript
'use strict';
let karmaConfig = require('ngx-karma').karma(require('./webpack.config'));

module.exports = (config) => {
  config.set(karmaConfig);
};
```

Runs all tests (`*.spec.ts`) required from a main entry point (`src/app/test.ts`).

#### Deployment

Can bundle the application as in development with the addition of minification and offline-first approach.
Only bundles the application, doesn't serve it with `webpack-dev-server`.

Can be activated with 
`process.env.NODE_ENV = 'production''` or 
`process.env.npm_lifecycle_event = 'build'` or
`require('@ngx-webpack/core').webpack({ env: 'production' });`

#### Dll generation

Special kind of mode intended for generating Webpack DLL files for faster development builds and test runs.

### Customization

Customization can be done before generation with the predefined options 
or afterwards by modifying the generated Webpack configuration.

Here is the list of default options and a later added loader to the generated configuration.

```javascript
let webpackConfig = require('@ngx-webpack/core').webpack({
  // For which environment the config will be generated
  // Possible values: development, test, production, install
  env: 'development',
  
  // The port where the application will be available in development
  port: 3000,
  
  // Where the bundled files will be created
  outputDir: 'dist',
  
  // What type of files are used in component templates
  // Possible values: html, pug - otherwise corresponding loader should be installed
  templateFormat: 'html',
  
  // What type of styles are used in component and global styles
  // Possible values: css, scss, sass, less - otherwise corresponding loader should be installed
  styleFormat: 'css',
  
  // Location of Typescript configuration
  tsConfig: 'tsconfig.json',
    
  // Location of Tslint configuration
  tsLint: 'tslint.json',
  
  // Run AOT compilation when bundling
  aot: false,
  
  // Whether to reload page on file changes
  liveReload: true,
  
  // Use linting while bundling
  continuousLinting: true,
  
  // Generate entry index.html file or not
  indexHtml: true,
  
  // Use file content hash as suffix in file names, if false defaults to 'bundle'
  useHash: true,
  
  // Add service worker for offline caching
  serviceWorker: true,
  
  // Files to be copied from ./src directory
  staticFiles: [
    { "from": "assets", "to": "assets" }
  ],
  
  // Use generated dll file to speed up builds
  useDlls: true,
  
  // Polyfill files to be included before everything else
  polyfills: [
    'ts-helpers',
    'core-js/client/shim',
    'zone.js/dist/zone',
    'zone.js/dist/long-stack-trace-zone'
  ],
  
  // Polyfill files necessary for rnning the tests
  testPolyfills: [
    'zone.js/dist/async-test',
    'zone.js/dist/fake-async-test',
    'zone.js/dist/sync-test',
    'zone.js/dist/proxy',
    'zone.js/dist/jasmine-patch',
  ],
  
  // Packages to be included in vendor file next to main file
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
  
  // Packages used in DLL generation in addition to vendor files (won't be included in production build)
  dlls: [
    '@angular/compiler',
    '@angular/platform-browser-dynamic'
  ]
});

// Add Coffeescript loader manually
webpackConfig.module.rules.push({
  test: /\.coffee$/,
  loader: 'coffee-loader'
});

module.exports = webpackConfig;
```

### Loaders

Typescript files are translated with `awesome-typescript-loader`.
Inside components `styleUrls` and `templateUrl` will be inlined with `angular2-template-loader`.
When using `loadChildren` inside routing,
it will be moved to separate chunks with `angular-router-loader`.

Inside the `src/app` directory `.css` files will be required as strings to work with `angular2-template-loader`.
Outside this directory they will be moved to a single file(`style.bundle.css`) with `extract-text-plugin`.
Currently only CSS files are supported for stylesheets.
But if you want another format, just add it to `modules.rules` after the package generated the Webpack config.

In AOT mode components are compiled with their templates and styles.
In this mode the Typescript loaders are replaced with the `@ngtools/webpack` loader.
Technically it does the job of  `angular2-template-loader` and `angular-router-loader` also.

Additional loaders are added for images and fonts to handle them inside stylesheets.

### Testing

For test running Jasmine is used in combination with Karma + PhantomJS browser.

Tests can be run with the ```npm test``` command.
It runs all files with ```*.spec.ts``` extension inside the ```src/app``` folder.
The test setup is done in ```src/app/test.ts```.

To run tests continuously add the following script: ```"scripts": { "test-watch": "ng-test --watch" }```.
It will speed up rebuilds and run the tests automatically after every change.

### Linting

Linting is done with Tslint and Codelyzer rules.
It is included as a pre-loader for Webpack.

It's setup:

```
{
  "extends": "ngx-tslint-config"
}
```

### Deployment

After adding ```"scripts": { "build": "ng-build" }``` and running it, 
the generated files will appear in the ```dist``` folder. These are minified and ready for deployment.

Github Pages deployment can be done with ```"scripts": { "deploy": "ng-deploy" }```.

Instead of the original endpoint ```src/app/main.ts``` it starts from ```src/app/main.aot.ts```.

### Example projects

- [Angular 2 PhoneCat](https://github.com/emartech/angular2-phonecat)
