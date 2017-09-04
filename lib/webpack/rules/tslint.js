'use strict';

class TslintRule {
  constructor(config) {
    this.config = config;
  }

  isEnabled() {
    return this.config.continuousLinting;
  }

  getRule() {
    return {
      test: /\.ts$/,
      enforce: 'pre',
      exclude: [/ngfactory/, /shim/, /test\.ts/],
      loader: 'tslint-loader',
      options: {
        configFile: this.config.tsLint,
        tsConfigFile: this.config.tsConfig,
        typeCheck: true
      }
    };
  }
}

module.exports = TslintRule;
