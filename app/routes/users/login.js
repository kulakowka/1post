var express = require('express')
var router = express.Router()

// /login
router.get('/',
  (req, res, next) => {
    res.render('users/login')
  }
)

module.exports = router
