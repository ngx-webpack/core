'use strict';

const ExtractTextPlugin = require('extract-text-webpack-plugin');

class ExtractStyleRule {
  constructor(config) {
    this.config = config;
  }

  isEnabled() {
    return this.config.env !== 'test'
      && (
        this.config.styleFormat === 'css'
        || this.config.styleFormat === 'sass'
        || this.config.styleFormat === 'scss'
      );
  }

  getRule() {
    const loaderName = (this.config.styleFormat === 'scss' ? 'sass' : this.config.styleFormat);
    const loaders = ['css-loader'];
    if (this.config.styleFormat !== 'css') {
      loaders.push(`${loaderName}-loader`);
    }

    return {
      test: new RegExp(`\.${this.config.styleFormat}$`),
      exclude: this.config.appDir,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: loaders
      })
    };
  }
}

module.exports = ExtractStyleRule;
