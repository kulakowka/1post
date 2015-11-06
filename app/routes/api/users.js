var express = require('express')
var router = express.Router()

var users = require('../../controllers/api/users')
var ifUser = require('../../middlewares/ifUser')
var ifGuest = require('../../middlewares/ifGuest')

router.get('/', users.index)
router.get('/:username', users.show)

router.post('/login', ifGuest, users.login)
router.post('/register', ifGuest, users.register)

router.post('/logout', ifUser, users.logout)
router.post('/update', ifUser, users.update)
router.post('/destroy', ifUser, users.destroy)

module.exports = router
