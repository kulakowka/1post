var express = require('express')
var router = express.Router()

// /settings
router.get('/', 
  (req, res, next) => {
    res.render('users/settings')
  }
)

module.exports = router
