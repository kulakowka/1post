/**
 * @example
 * EmbedlyService(text)
 * .catch(error => cb(error))
 * .then(html => cb(null, html))
 *
 */

var request = require('superagent')
const API_ENDPOINT_URL = 'http://api.embed.ly/1/oembed'
const API_KEY = process.env.EMBEDLY_API_KEY || '784e6e620d3147b38ac196733a94f663'
const REGEXP = /^\s*(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?\s*$/i

function getPageData (url, callback) {
  request
    .get(API_ENDPOINT_URL)
    .query({
      url: url,
      key: API_KEY,
      maxwidth: 800
    })
    .end((err, res) => {
      if (err) callback(err)
      callback(null, res.body)
    })
}

function getUrl (text) {
  return REGEXP.test(text) && text.replace(/\s+/g, '')
}

// function cdnImage (url, width) {
//   return 'https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?url=' + url + '&container=focus&refresh=2592000&resize_w=' + width
// }

// получает объект data (ответ от embedly) и возвращает markdown текст
function templateLink (data) {
  var html = ''
  console.log(data)
  if (data.title) html += '## [' + data.title + '](' + data.url + ')\n\n'
  else html += '## ' + data.url + '\n\n'
  if (data.description) html += '' + data.description
  console.log(html)
  return html
}

module.exports = function EmbedlyService (text) {
  var url = getUrl(text)

  return new Promise((resolve, reject) => {
    if (!url) return resolve(text)
    
    getPageData(url, (err, data) => {
      if (err) return reject(err)
      resolve(templateLink(data))
    })
  })
  
}
