var express = require('express')
var router = express.Router()
var User = require('../../models/user')
var Comment = require('../../models/comment')
const ROOT_PARENT_ID = require('../../config/comments').ROOT_PARENT_ID

// /:username
router.get('/:username',

  (req, res, next) => {
    User
    .findOne({username: req.params.username})
    .select('-password')
    .exec()
    .catch(next)
    .then(user => {
      res.locals.user = user
      next()
    })
  },

  // if user not found
  (req, res, next) => {
    if (res.locals.user) return next()
    // TODO: Здесь еще надо бы порефакторить выглядит как то тупо :)
    var err = new Error('User Not Found')
    err.status = 404
    next(err)
  },

  (req, res, next) => {
    var user = res.locals.user

    Comment
    .find({
      creator: user._id,
      isDeleted: {
        $ne: true
      }
    })
    .limit(200)
    .sort({createdAt: -1})
    .select('-textSource')
    .populate({
      path: 'creator',
      select: 'username'
    })
    .exec()
    .catch(next)
    .then(comments => {
      res.locals.comments = comments
      next()
    })
  },
  (req, res, next) => {
    var user = res.locals.user

    res.render('users/show', {
      title: user.username,
      description: 'Comments by ' + user.username,
      parentId: ROOT_PARENT_ID,
      ROOT_PARENT_ID: ROOT_PARENT_ID
    })
  }
)

module.exports = router
