var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);

//// driver implementation

const sql = require('mssql/msnodesqlv8');

// config for your database
const config = {
  database: 'birthday-tracker',
  server: '(LocalDb)\\MSSQLLocalDB',
  driver: 'msnodesqlv8',
  options : {
    trustedConnection : true
  }
};
console.log('starting sql');

sql.connect(config, function (err) {

  if (err) console.log(err);

  // create Request object
  var request = new sql.Request();

  // query to the database and get the records
  request.query('select * from birthdays', function (err, recordset) {

    if (err) console.log(err)

    console.log('here is the recordset');
    console.log(recordset);
    // send records as a response
    //res.send(recordset);

  });
});

// const pool = new sql.ConnectionPool(config);
// pool.connect().then(() => {
//   //simple query
//   pool.request().query('select * from birthdays', (err, result) => {
//     if(err) res.send(err)
//     else{
//       return res.json({
//         data : result.recordset
//       })
//     }
//   })
//   sql.close();
// })
console.log('ending sql');

///////////////////////
// var sql = require("mssql");
//
//
// // server: 'DESKTOP-1HBVH0I\\LOCALDB#4E0DFA31',
//
// // server: '(localdb)\\mssqllocaldb',
//
// // config for your database
// var config = {
//   user: 'glg',
//   password: 'sA!Gt9]RZ6@p`~2/',
//   server: '(LocalDb)\\MSSQLLocalDB',
//   database: 'birthday-tracker'
// };
//
// // connect to your database
// sql.connect(config, function (err) {
//
//   if (err) console.log(err);
//
//   // create Request object
//   var request = new sql.Request();
//
//   // query to the database and get the records
//   request.query('select * from birthdays', function (err, recordset) {
//
//     if (err) console.log(err)
//
//     console.log('here is the recordset');
//     console.log(recordset);
//     // send records as a response
//     //res.send(recordset);
//
//   });
// });



/////////////

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// app.get('/', ((req, res) => {
//   console.log('get function was hit');
//   res.send('hello world!');
// }))
//
// const port = 3000;
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

module.exports = app;
