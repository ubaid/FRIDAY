const path = require('path');
const _ = require('underscore');
const DVUtils = require('../../shared/utils');

module.exports = (req, res) => {
  if (req.url.indexOf(DVUtils.LOGIN_PATH) !== 0 && _.isEmpty(req.cookies[DVUtils.FRIDAY_AUTH_TOKEN_KEY])) {
    res.redirect(DVUtils.LOGIN_PATH
      .concat(DVUtils.QM)
      .concat('redirect')
      .concat(DVUtils.EQUAL_TO)
      .concat(req.url));
    return;
  }

  res.sendFile(path.join(`${ __dirname }/../views/index.html`));
};
