'use strict';

class LocalFontRule {
  constructor(config) {
    this.config = config;
  }

  isEnabled() {
    return true;
  }

  getRule() {
    return {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file-loader'
    };
  }
}

module.exports = LocalFontRule;
