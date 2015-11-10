var express = require('express')
var router = express.Router()

var ifGuest = require('./middlewares/ifGuest')
var ifUser = require('./middlewares/ifUser')
var ifAdmin = require('./middlewares/ifAdmin')
var ifApiKey = require('./middlewares/ifApiKey')
var templateHelpers = require('./middlewares/templateHelpers')

router.use(templateHelpers)

router.use('/', require('./comments'))
router.use('/api', ifApiKey, require('./api'))
router.use('/admin', ifUser, ifAdmin, require('./admin'))
router.use('/sitemap.xml', require('./sitemap'))
router.use('/settings', ifUser, require('./users/settings'))
router.use('/login', ifGuest, require('./users/login'))
router.use('/register', ifGuest, require('./users/register'))
router.use('/confirm', require('./users/confirm'))
router.use('/', require('./users/show'))

module.exports = router
