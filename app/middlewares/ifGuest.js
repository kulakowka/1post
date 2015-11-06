module.exports = (req, res, next) => {
  if (req.user) return res.status(400).json({error: 'You are already logged in'})
  next()
}
