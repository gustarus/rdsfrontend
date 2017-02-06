'use strict';

module.exports = function(rootDir) {
  return {
    context: rootDir,
    debug: false,
    devtool: 'cheap-source-map'
  }
};
