'use strict';

class PugRule {
  constructor(config) {
    this.config = config;
  }

  isEnabled() {
    return this.config.templateFormat === 'pug' || this.config.templateFormat === 'jade';
  }

  getRule() {
    return {
      test: new RegExp(`\.${this.config.templateFormat}$`),
      loaders: ['apply-loader', 'pug-loader?self']
    };
  }
}

module.exports = PugRule;
