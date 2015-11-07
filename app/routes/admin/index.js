var express = require('express')
var router = express.Router()

var ifUser = require('../../middlewares/ifUser')
var ifAdmin = require('../../middlewares/ifAdmin')

router.use(ifUser, ifAdmin)

router.use((req, res, next) => {
  res.locals.adminPage = true
  next()
})

// admin/comments
router.use('/comments', require('./comments'))

// api/users
router.use('/users', require('./users'))

module.exports = router
