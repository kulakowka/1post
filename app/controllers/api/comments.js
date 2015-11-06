var Comment = require('../../models/comment')
var ROOT_PARENT_ID = require('../../config/comments').ROOT_PARENT_ID

module.exports.index = (req, res, next) => {
  // api/comments?parentId=1231212
  var parentId = req.query.parentId || ROOT_PARENT_ID
  var sort = parentId === ROOT_PARENT_ID ? -1 : 1

  Comment
    .find({parentId: parentId})
    .limit(20)
    .sort({ createdAt: sort })
    .select('-textSource')
    .exec((err, comments) => {
      if (err) return next(err)
      res.json({comments})
    })
}

module.exports.show = (req, res, next) => {
  // api/comments/213123
  Comment
    .findById(req.params.id)
    .populate({
      path: 'creator',
      select: 'username'
    })
    .select('-textSource')
    .exec((err, comment) => {
      if (err) return next(err)
      if (!comment) return res.status(404).json({error: 'Comment not found'})
      res.json({comment})
    })
}

module.exports.create = (req, res, next) => {
  var comment = new Comment({
    textSource: req.body.textSource,
    parentId: req.body.parentId,
    creator: req.user._id
  })

  comment.save((err, comment) => {
    if (err) return next(err)
    res.redirect('/api/comments/' + comment._id)
    // обновим кол-во комментов у родителя
    Comment.updateRepliesCount(comment.parentId)
  })
}
