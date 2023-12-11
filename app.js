var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/routeindex');
var usersRouter = require('./routes/routeusers');
var toDoRouter = require('./routes/routeToDo');
var mapRouter = require('./routes/routemap');
var userPageRouter = require('./routes/routeuserPage');
var contactRouter = require('./routes/routecontactForm');
var accountDetailsRouter = require('./routes/routeaccountDetails');

require('dotenv').config();
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
app.use('/stylesheets', express.static(path.join(__dirname, 'stylesheets')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/ToDo', toDoRouter);
app.use('/map', mapRouter);
app.use('/userPage', userPageRouter);
app.use('/contactForm', contactRouter);
app.use('/accountDetails', accountDetailsRouter);

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

app.get('/getLocations', (req, res) => {
  // Retrieve the locations from the database and send them to the client
});

app.post('/saveLocation', (req, res) => {
  let location = req.body;
  // Save the location to the database
});

module.exports = app;