var express = require('express')
var router = express.Router()

var users = require('../../controllers/admin/users')

// admin/users
router.get('/', users.index)

module.exports = router
