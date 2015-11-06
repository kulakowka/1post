var sitemap = require('../services/sitemap')

module.exports.index = (req, res, next) => {
  sitemap.generateSiteMap((err, generatedSitemap) => {
    if (err) next(err)
    res.send(generatedSitemap)
  })
}
