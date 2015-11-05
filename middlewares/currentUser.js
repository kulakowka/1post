var moment = require('moment')

module.exports = (req, res, next) => {
  res.locals.currentUser = req.user
  res.locals.moment = moment
  next()
}
