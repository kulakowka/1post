var session = require('express-session')
var MongoStore = require('connect-mongo')(session)
var mongoose = require('./db')

// необходимо поставить true, если сайт будет работать только по https (а так и будет в продакшене),
// а так же вот это app.set('trust proxy', 1) // trust first proxy если express будет стоять за прокси
// вот тут подробно написано про это https://github.com/expressjs/session
//
// var sess = {
//   secret: 'keyboard cat',
//   cookie: {}
// }
//
// if (app.get('env') === 'production') {
//   app.set('trust proxy', 1) // trust first proxy
//   sess.cookie.secure = true // serve secure cookies
// }
//
// app.use(session(sess))

// 30 days for session cookie lifetime
//
// const SESSION_COOKIE_LIFETIME = 1000 * 60 * 60 * 24 * 30

module.exports = session({
  secret: '1P0F55gj3dsss777kllpom',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    touchAfter: 24 * 3600 // time period in seconds
  }),
  cookie: {
    // maxAge: SESSION_COOKIE_LIFETIME  // 60 sec
  }
})
