module.exports = (req, res, next) => {
  // if (req.query.apiKey !== req.user.apiKey) return res.status(400).json({error: 'You are already logged in'})
  next()
}
