var express = require('express')
var router = express.Router()

// /about
router.get('/about',
  (req, res, next) => {
    res.render('pages/about')
  }
)

module.exports = router
