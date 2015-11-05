const ROOT_PARENT_ID = require('../config/comments').ROOT_PARENT_ID

var Comment = require('../models/comment')

module.exports.index = (req, res, next) => {
  Comment
    .find({parentId: ROOT_PARENT_ID})
    .populate({
      path: 'creator',
      select: 'username'
    })
    .limit(20)
    .sort({ createdAt: -1 })
    .select('-textSource')
    .exec((err, comments) => {
      if (err) return next(err)
      res.render('comments/index', {
        comments,
        title: 'Comments root',
        parentId: ROOT_PARENT_ID,
        ROOT_PARENT_ID: ROOT_PARENT_ID
      })
    })
}

// Load comments replies via ajax (for first time)
module.exports.replies = (req, res, next) => {
  var parentId = req.params.id
  var sort = ROOT_PARENT_ID.equals(parentId) ? -1 : 1

  Comment
    .find({parentId: parentId})
    .populate({
      path: 'creator',
      select: 'username'
    })
    .limit(20)
    .sort({ createdAt: sort })
    .select('-textSource')
    .exec((err, comments) => {
      if (err) return next(err)
      res.render('comments/replies', {
        comments,
        title: 'Comments root',
        parentId: req.params.id,
        ROOT_PARENT_ID: ROOT_PARENT_ID
      })
    })
}

module.exports.show = (req, res, next) => {
  // /comments/213123
  Comment
    .findById(req.params.id)
    .populate({
      path: 'creator',
      select: 'username'
    })
    .select('-textSource')
    .exec((err, comment) => {
      if (err) return next(err)
      if (!comment) return res.status(404).render('error', {error: 'Comment not found'})
      res.render('comments/show', {
        comment,
        title: 'Comments show',
        parentId: comment._id,
        ROOT_PARENT_ID: ROOT_PARENT_ID
      })
    })
}
