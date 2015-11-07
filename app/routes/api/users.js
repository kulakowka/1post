var express = require('express')
var router = express.Router()

var User = require('../../models/user')
var passport = require('../../config/passport')

var ifUser = require('../middlewares/ifUser')
var ifGuest = require('../middlewares/ifGuest')

router.get('/',
  (req, res, next) => {
    User
    .find()
    .limit(20)
    .sort({ _id: -1 })
    .select('-password -comments')
    .exec((err, users) => {
      if (err) return next(err)
      res.json({users})
    })
  }
)

router.get('/:username',
  (req, res, next) => {
    User
    .findOne({username: req.params.username})
    .select('-password')
    .exec((err, user) => {
      if (err) return next(err)
      if (!user) return res.status(404).json({error: 'User not found'})
      res.json({user})
    })
  }
)

router.post('/login',
  ifGuest,
  (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) { return next(err) }
      if (!user) { return res.status(400).json({error: 'Invalid username or password'}) }
      req.logIn(user, (err) => {
        if (err) { return next(err) }
        res.redirect('/api/users/' + user.username)
      })
    })(req, res, next)
  }
)

router.post('/register', ifGuest,
  (req, res, next) => {
    User
    .findOne({username: req.body.username})
    .exec((err, user) => {
      if (err) return next(err)
      if (user) return res.status(400).json({error: 'A user with that username already exists'})

      user = new User({
        username: req.body.username,
        password: req.body.password
      })

      user.save((err, user) => {
        if (err) return next(err)
        res.redirect('/api/users/' + user.username)
      })
    })
  }
)

router.post('/logout',
  ifUser,
  (req, res, next) => {
    req.logout()
    res.json({message: 'Session destroyed'})
  }
)

router.post('/update',
  ifUser,
  (req, res, next) => {
    var user = req.user

    user.comparePassword(req.body.password, (err, isValid) => {
      if (err) return next(err)
      if (!isValid) return res.status(400).json({error: 'Current password is incorrect'})

      user.username = req.body.username
      if (req.body.newPassword) user.password = req.body.newPassword

      user.save((err, user) => {
        if (err) return next(err)
        res.redirect('/api/users/' + user.username)
      })
    })
  }

)
router.post('/destroy',
  ifUser,
  (req, res, next) => {
    var user = req.user

    user.comparePassword(req.body.password, (err, isValid) => {
      if (err) return next(err)
      if (!isValid) return res.status(400).json({error: 'Current password is incorrect'})

      user.isDeleted = true

      user.save((err, user) => {
        if (err) return next(err)
        req.logout()
        res.redirect('/api/users/' + user.username)
      })
    })
  }
)

module.exports = router
