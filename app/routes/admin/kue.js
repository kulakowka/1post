var kue = require('kue')
// var ui = require('kue-ui')
var express = require('express')
var router = express.Router()

// ui.setup({
//   apiURL: '/admin/kue/api', // IMPORTANT: specify the api url
//   baseURL: '/admin/kue', // IMPORTANT: specify the base url
//   updateInterval: 5000 // Optional: Fetches new data every 5000 ms
// })

// Mount kue JSON api
router.use('/', kue.app)

// Mount UI
// router.use('/', ui.app)

module.exports = router
