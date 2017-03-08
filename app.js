var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var login = require('./routes/login')
var sql = require('./sql/sql')
var app = express();
var config = require('./config/dbconfig');
//启动mysql连接池
sql.init(config)

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');



// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
  let body = req.body
  let key
  for (let item in body) {
    key = item
    break
  }
  key = JSON.parse(key)
  req.body = key
  next()
})
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//  解决Node.JS跨域问题
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
  else  next();
});

app.use('/login', login)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log(req.url)
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err)
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
