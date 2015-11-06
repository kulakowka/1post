var User = require('../models/user')

module.exports.index = (req, res, next) => {
  User
    .find()
    .limit(20)
    .sort({ createdAt: -1 })
    .select('-password')
    .exec((err, users) => {
      if (err) return next(err)
      res.render('users/index', {users, title: 'home page'})
    })
}

module.exports.show = (req, res, next) => {
  User
    .findOne({username: req.params.username})
    .select('-password')
    .exec((err, user) => {
      if (err) return next(err)
      if (!user) return res.status(404).render('error', {error: 'User not found'})
      res.render('users/show', {user})
    })
}

module.exports.settings = (req, res, next) => {
  res.render('users/settings')
}

module.exports.login = (req, res, next) => {
  res.render('users/login')
}

module.exports.register = (req, res, next) => {
  res.render('users/register')
}
