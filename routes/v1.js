const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller');
const CompanyController = require('../controllers/company.controller');
const HomeController = require('../controllers/home.controller');
const MaterialsController = require('../controllers/material.controller');
const CustomersController = require('../controllers/customer.controller');

const custom = require('./../middleware/custom');

const passport = require('passport');
const path = require('path');


require('./../middleware/passport')(passport)
/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({ status: "success", message: "da Vinci API", data: { "version_number": "v1.0.0" } })
});

router.post('/scoring/materials', passport.authenticate('jwt', { session: false }), MaterialsController.score);
router.post('/scoring/customers', passport.authenticate('jwt', { session: false }), CustomersController.score);

router.post('/users', UserController.create);                                                    // C
router.get('/users', passport.authenticate('jwt', { session: false }), UserController.get);        // R
router.put('/users', passport.authenticate('jwt', { session: false }), UserController.update);     // U
router.delete('/users', passport.authenticate('jwt', { session: false }), UserController.remove);     // D
router.post('/users/login', UserController.login);

router.post('/companies', passport.authenticate('jwt', { session: false }), CompanyController.create);                  // C
router.get('/companies', passport.authenticate('jwt', { session: false }), CompanyController.getAll);                  // R

router.get('/companies/:company_id', passport.authenticate('jwt', { session: false }), custom.company, CompanyController.get);     // R
router.put('/companies/:company_id', passport.authenticate('jwt', { session: false }), custom.company, CompanyController.update);  // U
router.delete('/companies/:company_id', passport.authenticate('jwt', { session: false }), custom.company, CompanyController.remove);  // D

router.get('/dash', passport.authenticate('jwt', { session: false }), HomeController.Dashboard)



module.exports = router;
