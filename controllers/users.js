var User = require('../models/user')

module.exports.show = (req, res, next) => {
  User
    .findOne({username: req.params.username})
    .select({ username: 1, _id: 1 })
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
