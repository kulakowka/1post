module.exports = (req, res, next) => {
  var adminUsername = process.env.ADMIN_USERNAME || 'kulakowka'
console.log('adminUsername ', adminUsername)
  if (req.user.username !== adminUsername) return res.status(401).json({error: 'Unauthorized, login please'})
  next()
}
