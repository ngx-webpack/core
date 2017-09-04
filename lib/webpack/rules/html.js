'use strict';

class HtmlRule {
  constructor(config) {
    this.config = config;
  }

  isEnabled() {
    return this.config.templateFormat === 'html';
  }

  getRule() {
    return {
      test: /\.html$/,
      loader: 'html-loader',
      query: {
        removeAttributeQuotes: false,
          caseSensitive: true,
          customAttrSurround: [
          [/#/, /(?:)/],
          [/\*/, /(?:)/],
          [/\[?\(?/, /(?:)/]
        ],
        customAttrAssign: [/\)?\]?=/]
      }
    };
  }
}

module.exports = HtmlRule;
