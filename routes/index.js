var express = require('express')
var router = express.Router()

var home = require('../controllers/home')
var currentUser = require('../middlewares/currentUser')

router.get('/', currentUser, home.index)

module.exports = router
