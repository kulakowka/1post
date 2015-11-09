var express = require('express')
var router = express.Router()

router.use((req, res, next) => {
  res.locals.adminPage = true
  next()
})

// admin/comments
router.use('/comments', require('./comments'))

// admin/users
router.use('/users', require('./users'))

// admin/kue
router.use('/kue', require('./kue'))

module.exports = router
