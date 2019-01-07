const express = require('express');
const indexController = require('../controllers/index.controller');

const router = express.Router();

module.exports = () => {
  router.get('/login', indexController);
  router.get('/search', indexController);
  router.get('/score', indexController);
  router.get('/', indexController);

  return router;
};
