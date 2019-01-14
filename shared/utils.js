const _ = require('underscore');

const DVUtils = {
  AMPERSAND: '&',
  DOUBLE_QUOTES: '"',
  EMAIL_REGEX: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/,
  EMPTY_STRING: '',
  EQUAL_TO: '=',
  FRIDAY_AUTH_TOKEN_KEY: 'fridayauthtoken',
  HASH: '#',
  HYPHEN: '-',
  LOGIN_PATH: '/login',
  PERIOD: '.',
  QM: '?',
  SEARCH_PATH: '/search',
  SPACE: ' ',
  UNDERSCORE: '_',

  isEmailValid(email) {
    return _.isString(email) && DVUtils.EMAIL_REGEX.test(email);
  },

  capitalizeFirstLetter(string) {
    return _.isString(string) ? string.charAt(0).toUpperCase() + string.substr(1) : DVUtils.EMPTY_STRING;
  },

  normalizePort(val) {
    const port = parseInt(val, 10);

    if (_.isNaN(port)) {
      return val;
    }

    if (port >= 0) {
      return port;
    }

    return false;
  },

  deepClone(inputObject) {
    let objLength;

    if (inputObject == null || typeof inputObject !== 'object') {
      return inputObject;
    }

    if (inputObject instanceof Date) {
      const copy = new Date();
      copy.setTime(inputObject.getTime());

      return copy;
    }

    if (inputObject instanceof Array) {
      const copy = [];
      objLength = inputObject.length;

      for (let index = 0; index < objLength; index += 1) {
        copy[index] = this.deepClone(inputObject[index]);
      }

      return copy;
    }

    // Handle Object
    if (inputObject instanceof Object) {
      const copy = {};

      _.each(Object.keys(inputObject), (attr) => {
        copy[attr] = this.deepClone(inputObject[attr]);
      }, this);

      return copy;
    }

    throw new Error('Unable to copy obj! Its type isn\'t supported.');
  },

  getMergedItems: (list1, list2, itemKey) => {
    if (_.isEmpty(list1)) {
      return list2;
    }

    if (_.isEmpty(list2)) {
      return list1;
    }

    const mergedList = [];
    const key = itemKey || 'id';
    const idsInList1 = [];

    _.each(list1, (item) => {
      idsInList1.push(item[key]);
      mergedList.push(item);
    });

    _.each(list2, (item) => {
      const indexInList1 = idsInList1.indexOf(item[key]);

      if (indexInList1 !== -1) {
        const itemInList1 = list1[indexInList1];
        mergedList[indexInList1] = _.extend(itemInList1, item);
      } else {
        mergedList.push(item);
      }
    });

    return mergedList;
  },

  getStringFromHash() {
    if (window.location.hash.indexOf(DVUtils.HASH) === 0) {
      return decodeURIComponent(window.location.hash.substr(1));
    }

    return DVUtils.EMPTY_STRING;
  },
};

module.exports = DVUtils;
