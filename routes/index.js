var express = require('express')
var router = express.Router()

var home = require('../controllers/home')
var users = require('../controllers/users')
var currentUser = require('../middlewares/currentUser')
var ifUser = require('../middlewares/ifUser')
var ifGuest = require('../middlewares/ifGuest')

router.use(currentUser)

router.get('/', home.index)
router.use('/api/users', require('./api/users'))
router.get('/settings', ifUser, users.settings)
router.get('/login', ifGuest, users.login)
router.get('/register', ifGuest, users.register)
router.get('/:username', users.show)

module.exports = router
