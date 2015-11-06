var express = require('express')
var router = express.Router()

router.use('/users', require('./users'))
router.use('/comments', require('./comments'))

module.exports = router
