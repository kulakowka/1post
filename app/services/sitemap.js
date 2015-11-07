/**
 * @example
 * SitemapService()
 * .catch(error => cb(error))
 * .then(xml => cb(null, xml))
 *
 */

var sm = require('sitemap')
var Comment = require('../models/comment')

function generateSiteMap (resolve, reject) {
  Comment
    .find()
    .populate({
      path: 'creator',
      select: 'username'
    })
    .limit(1000)
    .sort({createdAt: -1})
    .select('-textSource')
    .exec()
    .catch(reject)
    .then(comments => {
      var sitemap = createSiteMap(comments)
      sitemap.toXML(function (err, xml) {
        if (err) return reject(err)
        resolve(xml)
      })
    })
}

function createSiteMap (comments) {
  var urls = comments.map(comment => {
    return {
      url: '/comments/' + comment._id,
      changefreq: 'weekly',
      lastmod: comment.updatedAt
    }
  })

  var sitemap = sm.createSitemap({
    hostname: 'http://1po.st',
    cacheTime: 600000,  // 600 sec (10 min) cache purge period
    urls: urls
  })

  return sitemap
}

module.exports = function SitemapService () {
  return new Promise(generateSiteMap)
}
