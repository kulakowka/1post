var express = require('express')
var router = express.Router()

var comments = require('../../controllers/api/comments')
var ifUser = require('../../middlewares/ifUser')
// var ifGuest = require('../../middlewares/ifGuest')

// api/comments
router.get('/', comments.index)

// api/comments/:id
router.get('/:id', comments.show)

// api/comments/create
router.post('/create', ifUser, comments.create)

module.exports = router
