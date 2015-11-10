var express = require('express')
var router = express.Router()
var VerificationToken = require('../../models/verificationToken')

router.get('/failure', (req, res, next) => {
  res.render('users/confirm/failure')
})

router.get('/success', (req, res, next) => {
  res.render('users/confirm/success')
})

// /confirm/:token
router.get('/:token',
  (req, res, next) => {
    var token = req.params.token
    VerificationToken.verifyUser(token, (err) => {
      if (err) return res.redirect('/confirm/failure')
      res.redirect('/confirm/success')
    })
  }
)

module.exports = router
