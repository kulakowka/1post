module.exports = (req, res, next) => {
  var adminUsername = process.env.ADMIN_USERNAME || 'kulakowka'
  
  if (req.user.username !== adminUsername) return res.status(401).json({error: 'Unauthorized, login please'})
  next()
}
