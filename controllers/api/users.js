var User = require('../../models/user')
var passport = require('../../config/passport')

module.exports.index = (req, res, next) => {
  User
    .find()
    .limit(20)
    .sort({ _id: -1 })
    .select({ username: 1, _id: 1 })
    .exec((err, users) => {
      if (err) return next(err)
      res.json({users})
    })
}

module.exports.show = (req, res, next) => {
  User
    .findOne({username: req.params.username})
    .select({ username: 1, _id: 1 })
    .exec((err, user) => {
      if (err) return next(err)
      if (!user) return res.status(404).json({error: 'User not found'})
      res.json({user})
    })
}

module.exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err) }
    if (!user) { return res.status(400).json({error: 'Invalid username or password'}) }
    req.logIn(user, (err) => {
      if (err) { return next(err) }
      res.redirect('/api/users/' + user.username)
    })
  })(req, res, next)
}

module.exports.logout = (req, res, next) => {
  req.logout()
  res.json({message: 'Session destroyed'})
}

module.exports.register = (req, res, next) => {
  User
    .findOne({username: req.body.username})
    .exec((err, user) => {
      if (err) return next(err)
      if (user) return res.status(400).json({error: 'A user with that username already exists'})

      user = new User({
        username: req.body.username,
        password: req.body.password
      })

      user.save((err, user) => {
        if (err) return next(err)
        res.redirect('/api/users/' + user.username)
      })
    })
}

module.exports.update = (req, res, next) => {
  var user = req.user

  user.comparePassword(req.body.password, (err, isMatch) => {
    if (err) return next(err)
    if (!isMatch) return res.status(400).json({error: 'Current password is incorrect'})

    user.username = req.body.username
    if (req.body.newPassword) user.password = req.body.newPassword

    user.save((err, user) => {
      if (err) return next(err)
      res.redirect('/api/users/' + user.username)
    })
  })
}

module.exports.destroy = (req, res, next) => {
  var user = req.user

  user.comparePassword(req.body.password, (err, isMatch) => {
    if (err) return next(err)
    if (!isMatch) return res.status(400).json({error: 'Current password is incorrect'})

    user.remove((err) => {
      if (err) return next(err)
      req.logout()
      res.json({user})
    })
  })
}
