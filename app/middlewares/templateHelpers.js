var moment = require('moment')

module.exports = (req, res, next) => {
  res.locals.moment = moment
  res.locals.adminName = 'kulakowka'
  next()
}
