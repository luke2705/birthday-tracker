var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const response = {"hello": "test"};
  res.send(JSON.stringify(response));
  // res.render('index', { title: 'Express' });
});

module.exports = router;
