module.exports = (req, res, next) => {
  res.locals.currentUser = req.user
  next()
}
