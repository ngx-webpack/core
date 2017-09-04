'use strict';

class RemoteFontRule {
  constructor(config) {
    this.config = config;
  }

  isEnabled() {
    return true;
  }

  getRule() {
    return {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url-loader',
      query: {
        limit: 10000,
        mimetype: 'application/font-woff'
      }
    };
  }
}

module.exports = RemoteFontRule;
