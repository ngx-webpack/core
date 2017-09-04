'use strict';

class ImageRule {
  constructor(config) {
    this.config = config;
  }

  isEnabled() {
    return true;
  }

  getRule() {
    return {
      test: /\.(jpg|jpeg|png|gif)$/,
      loader: 'file-loader'
    };
  }
}

module.exports = ImageRule;
