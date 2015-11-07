var express = require('express')
var router = express.Router()

// /register
router.get('/',
  (req, res, next) => {
    res.render('users/register')
  }
)

module.exports = router
