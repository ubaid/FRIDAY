const express = require('express');

const router = express.Router();

const auth = require('passport');
const UserController = require('../controllers/user.controller');
const CompanyController = require('../controllers/company.controller');
const HomeController = require('../controllers/home.controller');
const MaterialsController = require('../controllers/material.controller');
const CustomersController = require('../controllers/customer.controller');
const ProbabilityConfigController = require('../controllers/probabilityConfig.controller');
const SearchController = require('../controllers/search.controller');
const DownloadController = require('../controllers/download.controller');
const custom = require('../middleware/custom');

const options = { session: false };

require('../middleware/passport')(auth);

/* GET home page. */
router.get('/', (req, res) => {
  res.json({ status: 'success', message: 'da Vinci API', data: { version_number: 'v1.0.0' } });
});

router.post('/scoring/materials', auth.authenticate('jwt', options), MaterialsController.score);
router.post('/scoring/customers', auth.authenticate('jwt', options), CustomersController.score);

router.post('/users', UserController.create);
router.get('/users', auth.authenticate('jwt', options), UserController.get);
router.put('/users', auth.authenticate('jwt', options), UserController.update);
router.delete('/users', auth.authenticate('jwt', options), UserController.remove);
router.post('/users/login', UserController.login);
router.get('/users/logout', UserController.logout);

router.post('/companies', auth.authenticate('jwt', options), CompanyController.create);
router.get('/companies', auth.authenticate('jwt', options), CompanyController.getAll);

router.get('/companies/:company_id', auth.authenticate('jwt', options), custom.company, CompanyController.get);
router.put('/companies/:company_id', auth.authenticate('jwt', options), custom.company, CompanyController.update);
router.delete('/companies/:company_id', auth.authenticate('jwt', options), custom.company, CompanyController.remove);

router.post('/probabilityConfigs', auth.authenticate('jwt', options), ProbabilityConfigController.create);
router.get('/probabilityConfigs', auth.authenticate('jwt', options), ProbabilityConfigController.getAll);
router.put('/probabilityConfigs', auth.authenticate('jwt', options), ProbabilityConfigController.update);
router.delete('/probabilityConfigs', auth.authenticate('jwt', options), ProbabilityConfigController.remove);

router.post('/search', SearchController.search);
router.get('/download', DownloadController.download);

router.get('/dash', auth.authenticate('jwt', options), HomeController.Dashboard);

module.exports = router;
