'use strict';

let path = require('path');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

let appDir = path.resolve(process.cwd(), 'src', 'app');

module.exports = function(config) {
  let typescriptRule = {
    test: /\.ts/,
    loaders: [
      {
        loader: 'awesome-typescript-loader',
        options: {
          configFileName: config.tsConfig
        }
      },
      'angular2-template-loader',
      'angular-router-loader'
    ]
  };

  let typescriptAotRule = {
    test: /\.ts/,
    loaders: ['@ngtools/webpack']
    // loaders: ['@ultimate/aot-loader']
  };

  let rules = [
    {
      test: /\.ts$/,
      enforce: 'pre',
      exclude: [/ngfactory/, /shim/, /test\.ts/],
      loader: 'tslint-loader',
      options: {
        configFile: config.tsLint,
        tsConfigFile: config.tsConfig,
        typeCheck: true
      }
    },
    {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url-loader',
      query: {
        limit: 10000,
        mimetype: 'application/font-woff'
      }
    },
    {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file-loader'
    },
    {
      test: /\.(jpg|jpeg|png|gif)$/,
      loader: 'file-loader'
    }
  ];

  if (config.templateFormat === 'html') {
    rules.push({
      test: /\.html$/,
      loader: 'html-loader',
      query: {
        removeAttributeQuotes: false,
        caseSensitive: true,
        customAttrSurround: [
          [/#/, /(?:)/],
          [/\*/, /(?:)/],
          [/\[?\(?/, /(?:)/]
        ],
        customAttrAssign: [/\)?\]?=/]
      }
    });
  } else {
    rules.push({
      test: new RegExp(`\.${config.templateFormat}$`),
      loaders: ['apply-loader', `${config.templateFormat}-loader`]
    });
  }

  let extractStyleRule;
  if (config.styleFormat === 'css') {
    rules.push({
      test: /\.css$/,
      include: appDir,
      loaders: ['to-string-loader', 'css-loader']
    });

    extractStyleRule = {
      test: /\.css$/,
      exclude: appDir,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader']
      })
    };
  } else {
    let loaderName = (config.styleFormat === 'scss' ? 'sass' : config.styleFormat);
    let stylePattern = new RegExp(`\.${config.styleFormat}$`);

    rules.push({
      test: stylePattern,
      include: appDir,
      loaders: ['to-string-loader', 'css-loader', `${loaderName}-loader`]
    });

    extractStyleRule = {
      test: stylePattern,
      exclude: appDir,
      loader: ExtractTextPlugin.extract({
        fallbackLoader: 'style-loader',
        loader: ['css-loader', `${loaderName}-loader`]
      })
    };
  }

  if (config.env === 'test') {
    return rules.concat([typescriptRule]);
  }

  if (config.aot) {
    return rules.concat([typescriptAotRule, extractStyleRule]);
  }

  return rules.concat([typescriptRule, extractStyleRule]);
};
