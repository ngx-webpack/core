'use strict';

class AotRule {
  constructor(config) {
    this.config = config;
  }

  isEnabled() {
    return this.config.env !== 'test' && this.config.aot;
  }

  getRule() {
    return {
      test: /\.ts/,
      loaders: ['@ngtools/webpack']
    };
  }
}

module.exports = AotRule;
