'use strict';

class SassRule {
  constructor(config) {
    this.config = config;
  }

  isEnabled() {
    return this.config.styleFormat === 'sass' || this.config.styleFormat === 'scss';
  }

  getRule() {
    return {
      test: new RegExp(`\.${this.config.styleFormat}$`),
      include: this.config.appDir,
      loaders: ['to-string-loader', 'css-loader', 'sass-loader']
    };
  }
}

module.exports = SassRule;
