var express = require('express')
var router = express.Router()



var templateHelpers = require('./middlewares/templateHelpers')
var ifUser = require('./middlewares/ifUser')
var ifGuest = require('./middlewares/ifGuest')
var ifAdmin = require('./middlewares/ifAdmin')

router.use(templateHelpers)

router.use('/', require('./comments'))  // complete
router.use('/api', require('./api'))
router.use('/admin', ifUser, ifAdmin, require('./admin')) // complete

// admin/sitemap
router.use('/sitemap.xml', require('./sitemap'))  // complete
router.use('/settings', ifUser, require('./users/settings')) // complete
router.use('/login', ifGuest, require('./users/login')) // complete
router.use('/register', ifGuest, require('./users/register')) // complete
router.use('/', require('./users/show'))  // complete

module.exports = router
