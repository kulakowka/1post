var sm = require('sitemap')
var Comment = require('../models/comment')

/**
 * SitemapService - сервис для генерации sitemap.xml
 *
 * @example
 * SitemapService()
 * .catch(error => cb(error))
 * .then(xml => cb(null, xml))
 */
module.exports = function SitemapService () {
  return new Promise(generateSiteMap)
}

/**
 * Метод для генерации sitemap
 * Вытаскивает 1000 не удаленных комментариев из базы
 * Генерит xml и возвращает его в коллбек resolve
 * Если случилась ошибка вызовется коллбек reject
 */
function generateSiteMap (resolve, reject) {
  Comment
    .find({isDeleted: {$ne: true}})
    .populate({
      path: 'creator',
      select: 'username'
    })
    .limit(1000)
    .sort({createdAt: -1})
    .select('-textSource')
    .exec()
    .then(getXml)
    .then(resolve)
    .catch(reject)
}

/**
 * На вход получает обычный массив комментариев из БД
 * Возвращает строку с xml картой
 */
function getXml (comments) {
  var urls = getUrls(comments)

  var sitemap = sm.createSitemap({
    hostname: 'http://1po.st', // TODO: надо брать хост из конфигов!!!
    cacheTime: 600000,  // 600 sec (10 min) cache purge period
    urls: urls
  })

  return new Promise((resolve, reject) => {
    sitemap.toXML((err, xml) => {
      if (err) return reject(err)
      resolve(xml)
    })
  })
}

/**
 * Функция возвращает массив комментариев с мета-информацией
 * На вход получает обычный массив комментариев из БД
 */
function getUrls (comments) {
  return comments.map(getComment)
}

/**
 * Функция возвращает объект содержащий информацию о комментарии (url, changefreq, lastmod)
 */
function getComment (comment) {
  return {
    url: '/comments/' + comment._id,
    changefreq: 'weekly',
    lastmod: comment.updatedAt
  }
}
