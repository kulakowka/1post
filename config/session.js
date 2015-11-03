var session = require('express-session')
var MongoStore = require('connect-mongo')(session)
var mongoose = require('./db')

module.exports = session({
  secret: '1P0F55gj3dsss777kllpom',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
})
