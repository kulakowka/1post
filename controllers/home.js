var User = require('../models/user')

module.exports.index = (req, res, next) => {
  User
    .find()
    .limit(20)
    .sort({ _id: -1 })
    .select({ username: 1, _id: 1 })
    .exec((err, users) => {
      if (err) return next(err)
      res.render('home/index', {users, title: 'home page'})
    })
}
