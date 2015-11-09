var kue = require('kue')
var ui = require('kue-ui')
var express = require('express')
var router = express.Router()

ui.setup({
    apiURL: '/kue/api', // IMPORTANT: specify the api url
    baseURL: '/kue/ui', // IMPORTANT: specify the base url
    updateInterval: 5000 // Optional: Fetches new data every 5000 ms
});

// Mount kue JSON api
router.use('/api', kue.app);
// Mount UI
router.use('/ui', ui.app);

module.exports = router
