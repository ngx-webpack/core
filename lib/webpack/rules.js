'use strict';

const HtmlRule = require('./rules/html');
const PugRule = require('./rules/pug');
const CssRule = require('./rules/css');
const SassRule = require('./rules/sass');
const ExtractStyleRule = require('./rules/extract-style');
const JitRule = require('./rules/jit');
const AotRule = require('./rules/aot');
const TslintRule = require('./rules/tslint');
const RemoteFontRule = require('./rules/remote-font');
const LocalFontRule = require('./rules/local-font');
const ImageRule = require('./rules/image');

module.exports = function(config) {
  return [
    HtmlRule,
    RemoteFontRule,
    LocalFontRule,
    ImageRule,
    PugRule,
    CssRule,
    SassRule,
    ExtractStyleRule,
    TslintRule,
    JitRule,
    AotRule
  ]
    .map(Rule => new Rule(config))
    .filter(rule => rule.isEnabled())
    .map(rule => rule.getRule());
};
