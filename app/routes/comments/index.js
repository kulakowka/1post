const ROOT_PARENT_ID = require('../../config/comments').ROOT_PARENT_ID
const adminUsername = process.env.ADMIN_USERNAME || 'kulakowka'

var Comment = require('../../models/comment')
var User = require('../../models/user')

var express = require('express')
var router = express.Router()

// Mainpage
router.get('/',

  // load latest comments
  (req, res, next) => {
    Comment
    .find({
      parentId: ROOT_PARENT_ID,
      isDeleted: {
        $ne: true
      }
    })
    .populate({
      path: 'creator',
      select: 'username'
    })
    .limit(200)
    .sort({createdAt: -1})
    .select('-textSource')
    .exec()
    .catch(next)
    .then(comments => {
      res.locals.comments = comments
      next()
    })
  },

  // render comments list view
  (req, res, next) => {
    res.render('comments/index', {
      title: '1 Po.st',
      description: 'Internet community',
      parentId: ROOT_PARENT_ID,
      ROOT_PARENT_ID: ROOT_PARENT_ID
    })
  }
)

// Create comment
router.post('/c/create',

  // save comment to db
  (req, res, next) => {
    new Comment({
      textSource: req.body.textSource,
      parentId: req.body.parentId,
      creator: req.user._id
    })
    .save()
    .catch(next)
    .then(comment => {
      res.locals.comment = comment
      next()
    })
  },

  // redirect to comment show without layout
  (req, res, next) => {
    var comment = res.locals.comment
    res.redirect('/c/' + comment._id)

    // TODO: надо убрать будет отсюда наверное в модели?
    Comment.updateRepliesCount(comment.parentId)
    User.updateCommentsCount(comment.creator)
  }

)

// Show comment
router.get('/c/:id',

  // load comment
  (req, res, next) => {
    Comment
    .findById(req.params.id)
    .populate({
      path: 'creator',
      select: 'username'
    })
    .select('-textSource')
    .exec()
    .catch(next)
    .then(comment => {
      res.locals.comment = comment
      next()
    })
  },

  // if comment not found
  (req, res, next) => {
    if (res.locals.comment) return next()
    // TODO: Здесь еще надо бы порефакторить выглядит как то тупо :)
    var err = new Error('Comment Not Found')
    err.status = 404
    next(err)
  },

  // render comment without layout if requested via ajax
  (req, res, next) => {
    if (!req.xhr) return next()
    res.render('comments/includes/comment', {
      ROOT_PARENT_ID: ROOT_PARENT_ID
    })
  },

  // render comment show page with layout
  (req, res, next) => {
    var comment = res.locals.comment

    res.render('comments/show', {
      ROOT_PARENT_ID: ROOT_PARENT_ID,
      title: comment.metaTitle,
      description: comment.metaDescription,
      parentId: comment._id
    })
  }
)

// GET /comments/:id/replies
router.get('/c/:id/replies',
  (req, res, next) => {
    var sort = ROOT_PARENT_ID.equals(req.params.id) ? -1 : 1

    Comment
      .find({
        parentId: req.params.id,
        isDeleted: {
          $ne: true
        }
      })
      .populate({
        path: 'creator',
        select: 'username'
      })
      .limit(20)
      .sort({ createdAt: sort })
      .select('-textSource')
      .exec()
      .catch(next)
      .then(comments => {
        res.locals.comments = comments
        next()
      })
  },

  (req, res, next) => {
    res.render('comments/replies', {
      title: 'Comments root',
      parentId: req.params.id,
      ROOT_PARENT_ID: ROOT_PARENT_ID
    })
  }
)

// POST /comments/:id/delete
router.post('/c/:id/delete',

  // load comment
  (req, res, next) => {
    Comment
    .findById(req.params.id)
    .populate({
      path: 'creator',
      select: 'username _id'
    })
    .select('-textSource')
    .exec()
    .catch(next)
    .then(comment => {
      res.locals.comment = comment
      next()
    })
  },

  (req, res, next) => {
    if (adminUsername !== req.user.username && !req.user._id.equals(res.locals.comment.creator._id)) return res.status(403).json({error: 'Permission denied'})
    next()
  },

  (req, res, next) => {
    var comment = res.locals.comment

    comment.isDeleted = true

    comment.save((err, comment) => {
      if (err) return next(err)
      res.redirect('/c/' + comment._id)
    })

    Comment.updateRepliesCount(comment.parentId)
    User.updateCommentsCount(comment.creator)
  }
)

module.exports = router
