const ROOT_PARENT_ID = require('../../config/comments').ROOT_PARENT_ID

var Comment = require('../../models/comment')

module.exports.index = (req, res, next) => {
  Comment
    .find({})
    .populate({
      path: 'creator',
      select: 'username'
    })
    .limit(200)
    .sort({ createdAt: -1 })
    .select('-textSource')
    .exec((err, comments) => {
      if (err) return next(err)
      res.render('comments/index', {
        comments,
        title: 'Comments list',
        adminPage: true,
        parentId: ROOT_PARENT_ID,
        ROOT_PARENT_ID: ROOT_PARENT_ID
      })
    })
}
