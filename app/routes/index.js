var express = require('express')
var router = express.Router()

var sitemap = require('../controllers/sitemap')
var users = require('../controllers/users')

var currentUser = require('../middlewares/currentUser')
var templateHelpers = require('../middlewares/templateHelpers')
var ifUser = require('../middlewares/ifUser')
var ifGuest = require('../middlewares/ifGuest')

router.use(currentUser)
router.use(templateHelpers)

router.use('/', require('./comments'))
router.use('/api', require('./api'))
router.use('/admin', require('./admin'))

// admin/sitemap
router.get('/sitemap.xml', sitemap.index)
router.get('/settings', ifUser, users.settings)
router.get('/login', ifGuest, users.login)
router.get('/register', ifGuest, users.register)
router.get('/:username', users.show)

module.exports = router
