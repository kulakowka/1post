var sitemap = require('../../services/sitemap')
var express = require('express')
var router = express.Router()

// sitemap.xml
router.get('/', 
  (req, res, next) => {
    sitemap.generateSiteMap((err, xml) => {
      if (err) next(err)
      res.header('Content-Type', 'application/xml')
      res.send(xml)
    })
  }
)

module.exports = router
