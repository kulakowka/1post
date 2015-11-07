var SitemapService = require('../../services/sitemap')
var express = require('express')
var router = express.Router()

// sitemap.xml
router.get('/',
  (req, res, next) => {
    SitemapService()
      .catch(next)
      .then((xml) => {
        res.header('Content-Type', 'application/xml')
        res.send(xml)
      })
  }
)

module.exports = router
