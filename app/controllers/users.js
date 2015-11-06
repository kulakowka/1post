var User = require('../models/user')
var Comment = require('../models/comment')
const ROOT_PARENT_ID = require('../config/comments').ROOT_PARENT_ID


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
      Comment
        .find({creator: user._id})
        .populate({
          path: 'creator',
          select: 'username'
        })
        .limit(20)
        .sort({ createdAt: -1 })
        .select('-textSource')
        .exec((err, comments) => {
          if (err) return next(err)
          res.render('users/show', {
            user,
            comments,
            title: user.username,
            description: 'Comments by ' + user.username,
            parentId: ROOT_PARENT_ID,
            ROOT_PARENT_ID: ROOT_PARENT_ID
          })
        })
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
