var User = require('../../models/user')

module.exports.index = (req, res, next) => {

  User
    .find()
    .limit(200)
    .sort({ createdAt: -1 })
    .select('-password')
    .exec((err, users) => {
      if (err) return next(err)
      res.render('users/index', {users, title: 'users list', adminPage: true})
    })
}
