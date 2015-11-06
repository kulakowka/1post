var sitemap = require('../services/sitemap')

module.exports.index = (req, res, next) => {
  sitemap.generateSiteMap((err, xml) => {
    if (err) next(err)
    res.header('Content-Type', 'application/xml')
    res.send(xml)
  })
}
