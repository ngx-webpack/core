'use strict';

let path = require('path');
let webpack = require('webpack');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
let AssetsPlugin = require('assets-webpack-plugin');
let FaviconsWebpackPlugin = require('favicons-webpack-plugin');
let OfflinePlugin = require('offline-plugin');
let CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
let ngtools = require('@ngtools/webpack');
// let ultimate = require('@ultimate/aot-loader');
let fs = require('fs');

module.exports = function(config) {
  let loaderOptions = require('./plugins/loader-options')(config);
  let suffix = config.useHash ? '[hash]' : 'bundle';

  let displayPlugins = [
    new webpack.optimize.CommonsChunkPlugin({ name: ['main', 'vendor'], minChunks: Infinity }),
    new ExtractTextPlugin(`style.${suffix}.css`),
    new CheckerPlugin()
  ];

  if (config.indexHtml) {
    displayPlugins.push(new HtmlWebpackPlugin({
      template: path.join(process.cwd(), 'src/index.html'),
    }));
    displayPlugins.push(new FaviconsWebpackPlugin({
      logo: path.join(process.cwd(), 'src/assets/img/angular.png'),
      icons: {
        android: false,
        appleIcon: false,
        appleStartup: false,
        coast: false,
        favicons: true,
        firefox: true,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: false
      }
    }))
  }

  let plugins = [
    new webpack.ProgressPlugin(),
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)@angular/,
      path.join(process.cwd(), 'src')
    ),
    new webpack.LoaderOptionsPlugin(loaderOptions),
    new webpack.DefinePlugin({
      ENV: JSON.stringify(config.env)
    }),
    new AssetsPlugin({
      path: config.outputDir,
      filename: 'webpack-assets.json',
      prettyPrint: true
    })
  ];

  let dllReferencePlugin = new webpack.DllReferencePlugin({
    context: path.join(process.cwd(), 'src'),
    manifest: path.join(process.cwd(), 'src/dll/angular-manifest.json')
  });

  if (config.env === 'install') {
    return plugins.concat([
      new webpack.DllPlugin({
        path: 'src/dll/[name]-manifest.json',
        name: '[name]_dll'
      })
    ]);
  }

  if (config.env === 'test') {
    if (config.useDlls) {
      plugins.push(dllReferencePlugin);
    }
    return plugins;
  }

  plugins = plugins.concat(displayPlugins);

  if (config.aot) {
    plugins.push(new ngtools.AotPlugin({
      tsConfigPath: config.tsConfig,
      entryModule: path.join(process.cwd(), 'src/app/modules/main.module#MainModule')
    }));
    // plugins.push(new ultimate.AotPlugin({
    //   tsConfig: config.tsConfig,
    //   entryModule: path.join(process.cwd(), 'src/app/modules/main.module#MainModule')
    // }));
  }

  if (config.env === 'development' && config.useDlls) {
    plugins.push(dllReferencePlugin);
    if (config.indexHtml) {
      plugins.push(new AddAssetHtmlPlugin({
        filepath: path.join(process.cwd(), 'src/dll/angular.dll.js')
      }));
    }
  }

  if (config.env === 'production') {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      mangle: { screw_ie8 : true },
      compress: {
        screw_ie8: true,
        warnings: false
      },
      comments: false
    }));

    if (config.useHash && config.serviceWorker) {
      plugins.push(new OfflinePlugin({
        AppCache: false,
        excludes: ['index.html', '**/*.map']
      }))
    }

    if (config.staticFiles && config.staticFiles.length) {
      plugins.push(new CopyWebpackPlugin(config.staticFiles));
    }
  }

  return plugins;
};
