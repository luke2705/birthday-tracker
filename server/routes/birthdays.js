 var executeQuery = require('../database/execute-query');

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  executeQuery('select * from birthdays order by birthday', res);
});

module.exports = router;
