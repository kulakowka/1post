var express = require('express')
var router = express.Router()

var User = require('../../models/user')

// admin/users
router.get('/', 
  (req, res, next) => {
    User
    .find()
    .limit(200)
    .sort({createdAt: -1})
    .select('-password')
    .exec()
    .catch(next)
    .then(users => {
      res.render('users/index', {
        users, 
        title: 'Users list'
      })
    })
  }
)

module.exports = router
