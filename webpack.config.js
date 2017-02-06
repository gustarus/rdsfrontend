'use strict';

var _ = require('lodash');

var rootDir = __dirname;
var nodeEnv = process.env.NODE_ENV;
var settings = _.merge(getDefaultsSettings(), getRuntimeSettings(), getLocalSettings());

function getDefaultsSettings() {
  return require(rootDir + '/config/defaults')(rootDir);
}

function getRuntimeSettings() {
  return require(rootDir + '/config/' + nodeEnv)(rootDir);
}

function getLocalSettings() {
  try {
    return require(rootDir + '/config/' + nodeEnv + '.local')(rootDir);
  } catch(e) {
    return null;
  }
}

module.exports = settings;
