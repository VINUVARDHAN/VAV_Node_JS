const express = require('express');
const router = express.Router();

const commonUtil = require('./commonUtil');
const utils = require('../utils');
var psqlOj;

module.exports = (psql) => {
  psqlOj = psql;

  router.get('/', (req, res) => {
    utils.homeFunctions.getHomePage(res);
  });

  //USERS---------------------------------------------------------------------------------
  router.post('/users', (req, res) => {
    try {
      commonUtil.userUtils.isValidUser(req, res, psql);
    } catch (err) {
      commonUtil.responseConstruction.ISE(res);
    }
  });
  return router;
};
