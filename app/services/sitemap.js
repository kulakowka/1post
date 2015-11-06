var sm = require('sitemap')
// var fs = require('fs-extra')
var Comment = require('../models/comment')
// var path = require('path')

// const SITEMAP_PATH = path.resolve(__dirname, '../../public/sitemap.xml')

function generateSiteMap (callback) {
  Comment
    .find()
    .populate({
      path: 'creator',
      select: 'username'
    })
    .limit(5000)
    .sort({ createdAt: -1 })
    .select('-textSource')
    .exec((err, comments) => {
      if (err) return callback(err)
      var sitemap = createSiteMap(comments)
      var content = sitemap.toString()
      // fs.writeFile(SITEMAP_PATH, content, (err) => {
      callback(err, content)
      // })
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

module.exports = {generateSiteMap}
