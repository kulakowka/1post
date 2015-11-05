var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var User = require('../models/user')

passport.use(new LocalStrategy((username, password, done) => {
  User
    .findOne({ username: username.toLowerCase() })
    .exec((err, user) => {
      if (err) return done(err)
      if (!user) return done(null, false)

      user.comparePassword(password, (err, isValid) => {
        if (err) return done(err)
        if (!isValid) return done(null, false)
        return done(null, user)
      })

      user.deletedAt = undefined
      user.isDeleted = false
      user.save()
    })
}))

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user)
  })
})

module.exports = passport
