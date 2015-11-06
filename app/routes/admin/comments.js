var express = require('express')
var router = express.Router()

var comments = require('../../controllers/admin/comments')

// admin/comments
router.get('/', comments.index)

module.exports = router
