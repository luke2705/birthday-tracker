var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const response = {"hello": "test"};
  res.send(JSON.stringify(response));
  // res.render('index', { title: 'Express' });
});

router.get('/db', function (req, res) {

  var sql = require("mssql");


  // server: 'DESKTOP-1HBVH0I\\LOCALDB#4E0DFA31',

  // server: '(localdb)\\mssqllocaldb',

  // config for your database
  var config = {
    user: 'glg',
    password: 'sA!Gt9]RZ6@p`~2/',
    server: '(localdb)\\\\mssqllocaldb',
    database: 'birthday-tracker'
  };

  // connect to your database
  sql.connect(config, function (err) {

    if (err) console.log(err);

    // create Request object
    var request = new sql.Request();

    // query to the database and get the records
    request.query('select * from birthdays', function (err, recordset) {

      if (err) console.log(err)

      // send records as a response
      res.send(recordset);

    });
  });
});

module.exports = router;
