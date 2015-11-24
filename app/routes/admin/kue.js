var kue = require('kue')
var express = require('express')
var router = express.Router()

// Mount kue JSON api
router.use('/', kue.app)

module.exports = router
