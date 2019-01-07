const _ = require('underscore');
const axios = require('axios');
const DVUtils = require('./utils');

class HTTPLib {
  constructor(loggerInstance, inpuOptions) {
    if (!_.isObject(loggerInstance)) {
      throw new Error('Logger cannot be undefined');
    }

    this.logger = loggerInstance;
    const options = _.extend({ baseURL: DVUtils.EMPTY_STRING }, inpuOptions);
    this.instance = axios.create({ baseURL: options.baseURL });

    // Add a request interceptor
    this.instance.interceptors.request.use((config) => {
      // Do something before request is sent
      return _.isFunction(options.preRequestProcessor) ? options.preRequestProcessor(config) : config;
    }, (error) => {
      // Do something with request error
      // eslint-disable-next-line compat/compat
      return Promise.reject(error);
    });

    // Add a response interceptor
    this.instance.interceptors.response.use((response) => {
      // Do something with response data
      return response;
    }, (error) => {
      // Do something with response error here
      if (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          this.logger.error(`Http request error with response: ${ JSON.stringify(error.response.data || '') }`);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          this.logger.error(`Http request error for request: ${ error.request } `);
        } else {
          this.logger.error(`Http request error: ${ error }`);
        }
        this.logger.error(`Http request error - config: ${ JSON.stringify(error.config) }`);
      }

      // eslint-disable-next-line compat/compat
      return Promise.reject(error);
    });
  }

  get(url, config) {
    if (!url) {
      const error = `No url provided for GET request.`
        + `URL: ${ url }, Config: ${ config ? JSON.stringify(config) : 'undefined' }`;
      // eslint-disable-next-line compat/compat
      return Promise.reject(error);
    }
    if (!config) {
      return this.instance.get(url);
    }
    return this.instance.get(url, config);
  }

  post(url, data, config) {
    if (!url) {
      const error = `No url provided for POST request.`
        + `URL: ${ url }, Config: ${ config ? JSON.stringify(config) : 'undefined' }`;
      // eslint-disable-next-line compat/compat
      return Promise.reject(error);
    }
    if (!config) {
      return this.instance.post(url, data);
    }
    return this.instance.post(url, data, config);
  }

  put(url, data, config) {
    if (!url) {
      const error = `No url provided for PUT request.`
        + `URL: ${ url }, Config: ${ config ? JSON.stringify(config) : 'undefined' }`;
      // eslint-disable-next-line compat/compat
      return Promise.reject(error);
    }
    if (!config) {
      return this.instance.put(url, data);
    }
    return this.instance.put(url, data, config);
  }

  patch(url, data, config) {
    if (!url) {
      const error = `No url provided for PATCH request.`
        + `URL: ${ url }, Config: ${ config ? JSON.stringify(config) : 'undefined' }`;
      // eslint-disable-next-line compat/compat
      return Promise.reject(error);
    }
    if (!config) {
      return this.instance.patch(url, data);
    }
    return this.instance.patch(url, data, config);
  }

  delete(url, config) {
    if (!url) {
      const error = `No url provided for DELETE request.`
        + `URL: ${ url }, Config: ${ config ? JSON.stringify(config) : 'undefined' }`;
      // eslint-disable-next-line compat/compat
      return Promise.reject(error);
    }
    if (!config) {
      return this.instance.delete(url);
    }
    return this.instance.delete(url, config);
  }

  request(config) {
    if (!config) {
      const error = `No config provided for request.`;
      // eslint-disable-next-line compat/compat
      return Promise.reject(error);
    }

    if (!config.url) {
      const error = `No url provided for request.`
        + `URL: ${ config.url }, baseURL: ${ config.baseURL }, Config: ${ JSON.stringify(config) }`;
      // eslint-disable-next-line compat/compat
      return Promise.reject(error);
    }
    return this.instance.request(config);
  }
}

module.exports = HTTPLib;
