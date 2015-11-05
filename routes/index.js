var express = require('express')
var router = express.Router()

var users = require('../controllers/users')
var comments = require('../controllers/comments')
var currentUser = require('../middlewares/currentUser')
var ifUser = require('../middlewares/ifUser')
var ifGuest = require('../middlewares/ifGuest')

router.use(currentUser)

router.get('/', comments.index)
router.get('/comments/:id', comments.show)
router.get('/comments/:id/replies', comments.replies)
router.get('/users', users.index)
router.use('/api/users', require('./api/users'))
router.use('/api/comments', require('./api/comments'))
router.get('/settings', ifUser, users.settings)
router.get('/login', ifGuest, users.login)
router.get('/register', ifGuest, users.register)
router.get('/:username', users.show)

module.exports = router
