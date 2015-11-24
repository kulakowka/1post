var session = require('express-session')
var MongoStore = require('connect-mongo')(session)
var mongoose = require('./db')

// 30 days for session cookie lifetime
const SESSION_COOKIE_LIFETIME = 1000 * 60 * 60 * 24 * 30
const COOKIE_SECRET = process.env.COOKIE_SECRET || '1P0F55gj3dsss777kllpom'

module.exports = session({
  secret: COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    touchAfter: 24 * 3600 // time period in seconds
  }),
  cookie: {
    maxAge: SESSION_COOKIE_LIFETIME
  }
})
