'use strict';

class JitRule {
  constructor(config) {
    this.config = config;
  }

  isEnabled() {
    return this.config.env === 'test' || !this.config.aot;
  }

  getRule() {
    return {
      test: /\.ts/,
      loaders: [
        {
          loader: 'awesome-typescript-loader',
          options: {
            configFileName: this.config.tsConfig
          }
        },
        'angular2-template-loader',
        'angular-router-loader'
      ]
    };
  }
}

module.exports = JitRule;
