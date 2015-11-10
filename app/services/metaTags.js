var truncate = require('truncate')
var cheerio = require('cheerio')

/**
 * MetaTagsService - Сервис для получения мета-информации из произвольного html
 *
 * @example
 * MetaTagsService(html)
 * .catch(error => cb(error))
 * .then(data => cb(null, data))
 */
module.exports = function MetaTagsService (html) {
  var data = getData(html)
  return Promise.resolve(data)
}

/**
 * Функция извлекает из html заголовок и описание для meta-тегов и возвращает объект содержащий все эти значения
 */
function getData (html) {
  var $ = cheerio.load(html)
  var elements = $('h1, h2, h3, h4, h5, p')

  var title = elements.first().text()
  var description = elements.eq(1).text()

  return {
    textHtml: html,
    metaTitle: truncate(title, 150),
    metaDescription: truncate(description, 160)
  }
}
