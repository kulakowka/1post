var moment = require('moment')
var adminUsername = process.env.ADMIN_USERNAME || 'kulakowka'

module.exports = (req, res, next) => {
  res.locals.moment = moment
  res.locals.adminName = adminUsername
  next()
}
