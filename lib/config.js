'use strict';

let minimist = require('minimist');
let defaultConfig = require('./default');
let path = require('path');

class Config {
  constructor() {
    this._npmLifecycleEvent = process.env.npm_lifecycle_event || '';
    this._nodeEnv = process.env.NODE_ENV || '';
    this._argv = minimist(process.argv.slice(2));
  }

  calculate(options = {}) {
    let envConfig = this._getEnvConfig();

    let config = Object.assign(defaultConfig, envConfig, options);
    config.tsLint = this._resolve(config.tsLint);
    config.tsConfig = this._resolve(config.tsConfig);
    config.outputDir = this._resolve(config.outputDir);
    config.appDir = path.resolve(process.cwd(), 'src', 'app');

    return config;
  }

  _getEnvConfig() {
    let singleRun = this._isSingleRun();
    let env = 'development';

    if (this._isProduction()) {
      env = 'production';
    } else if (this._isTest()) {
      env = 'test';
    } else if (this._isInstall()) {
      env = 'install';
    }

    let travis = !!process.env.TRAVIS;
    let aot = this._isAot();

    return { singleRun, env, travis, aot };
  }

  _isSingleRun() {
    return this._npmLifecycleEvent === 'test'
      || this._argv.singleRun
      || !!process.env.SINGLE_RUN;
  }

  _isProduction() {
    return this._npmLifecycleEvent === 'build'
      || this._nodeEnv === 'production';
  }

  _isTest() {
    return this._npmLifecycleEvent.indexOf('test') !== -1
      || this._nodeEnv === 'test';
  }

  _isInstall() {
    return this._npmLifecycleEvent === 'postinstall'
      || this._nodeEnv === 'install';
  }

  _isAot() {
    return this._argv.aot
      || !!process.env.AOT;
  }

  _resolve(filePath) {
    return path.isAbsolute(filePath)
      ? filePath
      : path.resolve(process.cwd(), filePath)
  }
}

module.exports = Config;
