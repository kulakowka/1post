const ROOT_PARENT_ID = require('../../config/comments').ROOT_PARENT_ID

var express = require('express')
var router = express.Router()

var Comment = require('../../models/comment')

// admin/comments
router.get('/',
  (req, res, next) => {
    Comment
    .find({})
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
      res.render('comments/index', {
        comments,
        title: 'Comments list',
        parentId: ROOT_PARENT_ID,
        ROOT_PARENT_ID: ROOT_PARENT_ID
      })
    })
  }
)

module.exports = router
