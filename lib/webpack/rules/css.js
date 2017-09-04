'use strict';

class CssRule {
  constructor(config) {
    this.config = config;
  }

  isEnabled() {
    return this.config.styleFormat === 'css';
  }

  getRule() {
    return {
      test: /\.css$/,
      include: this.config.appDir,
      loaders: ['to-string-loader', 'css-loader']
    };
  }
}

module.exports = CssRule;
