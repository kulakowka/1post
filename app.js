var express = require('express')
var path = require('path')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var passport = require('./config/passport')
var helmet = require('helmet')
var browserify = require('browserify-middleware')
var staticPath = require('./config/static')

var app = express()

app.use(helmet())

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// app settings

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(require('./config/session'))
app.use(require('./config/stylus'))
app.get('/js/app.js', browserify(path.join(__dirname, 'assets/js/app.js')))
app.use(staticPath.favicon)
app.use(staticPath.public)
app.use(staticPath.static)
app.use(passport.initialize())
app.use(passport.session())

// Routes setup
app.use('/', require('./routes/index'))

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

module.exports = app
