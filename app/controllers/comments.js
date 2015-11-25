'use strict'

// define models
const Comment = require('../models/comment')

// get root parent comment id
const ROOT_PARENT_ID = require('../config/comments').ROOT_PARENT_ID

// POST /comments
module.exports.create = (req, res, next) => {

}

// DELETE /comments/:id
module.exports.delete = (req, res, next) => {

}

// GET /comments
module.exports.index = (req, res, next) => {

  // Page local vars
  const description = 'Internet community'
  const parentId    = ROOT_PARENT_ID
  const title       = '1 Po.st'
  const view        = 'comments/index'

  // Load comments list
  Comment
    .find({parentId: ROOT_PARENT_ID, isDeleted: {$ne: true}})
    .populate('creator', 'username')
    .limit(200)
    .sort('-createdAt')
    .select('-textSource')
    .exec().catch(next)
    .then(comments => {

      // render comments list page
      res.render(view, {
        comments,
        description,
        parentId,
        ROOT_PARENT_ID,
        title
      })
    })
}

// GET /comments/:id
module.exports.show = (req, res, next) => {

  // Page local vars
  const comment      = req.comment
  const description  = comment.metaDescription
  const parentId     = comment._id
  const title        = comment.metaTitle
  const view         = 'comments/show'

  // Render comment show page
  res.render(view, {
    description,
    parentId
    ROOT_PARENT_ID,
    title,
  })
}

// PUT /comments/:id
module.exports.update = (req, res, next) => {

}

// middleware for load comments
module.exports.loadComment = function(req, res, next, id) {

  // Load one comment
  Comment
    .findById(id)
    .populate('creator', 'username')
    .select('-textSource')
    .exec().catch(next)
    .then(comment => {
      if (!comment) return next(notFound('Comment not found'))

      // set comment to local vars for view rendering
      res.locals.comment = comment
      next()
    })
}

// TODO: надо придумать куда эти штуки вынести, но похоже таких будет много разных
function notFound(message) {
  var error = new Error(message)
  error.status = 404
  return error  
}