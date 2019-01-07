/*
 * ************************************************************************
 *  ADOBE CONFIDENTIAL
 *  ___________________
 *
 *  Copyright 2018 Adobe
 *  All Rights Reserved.
 *
 *  NOTICE: All information contained herein is, and remains
 *  the property of Adobe and its suppliers, if any. The intellectual
 *  and technical concepts contained herein are proprietary to Adobe
 *  and its suppliers and are protected by all applicable intellectual
 *  property laws, including trade secret and copyright laws.
 *  Dissemination of this information or reproduction of this material
 *  is strictly forbidden unless prior written permission is obtained
 *  from Adobe.
 * ************************************************************************
 */
/* eslint-disable */

import _ from 'underscore';

const Logger = function(enabled) {
  this.enabled = _.isBoolean(enabled) ? enabled : true;
};

Logger.prototype = {
  isEnabled: function() {
    return this.enabled;
  },

  /**
   * Enable or disable the logger by passing a boolean.
   * @param enable <code>true</code> to enable and <code>false</code> to disable
   */
  enable: function(enable) {
    this.enabled = enable;
    return this;
  },

  /**
   * "error" is always logged irrespective of the value of "enabled" attribute
   */
  error: function() {
    return _.isFunction(console.error) && console.error(...arguments);
  },

  warn: function() {
    return this.enabled && _.isFunction(console.warn) && console.warn(...arguments);
  },

  info: function() {
    return this.enabled && _.isFunction(console.info) && console.info(...arguments);
  },

  debug: function() {
    return this.enabled && _.isFunction(console.debug) && console.debug(...arguments);
  },

  trace: function() {
    return this.enabled && _.isFunction(console.trace) && console.trace(...arguments);
  },

  log: function() {
    return this.enabled && _.isFunction(console.log) && console.log(...arguments);
  },

  print: function(method) {
    if (this.enabled) {
      const args = Array.prototype.slice.call(arguments, 1);
      return console[method](...args);
    }
  },
};

let logger;
const initLogger = () => {
  if (logger) {
    return logger;
  }

  const isDebugEnabled = window.location.search.indexOf('debug') !== -1
    || process.env.NODE_ENV === 'development';

  return new Logger(isDebugEnabled);
};

logger = initLogger();

export default logger;
