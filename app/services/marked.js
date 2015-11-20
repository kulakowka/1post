'use strict'

var marked = require('marked')
var highlightjs = require('highlight.js')
var renderer = new marked.Renderer()

// переопределим функцию которая рендерит ссылки
renderer.link = renderLink

// настройки парсинга markdown в html
marked.setOptions({
  renderer: renderer,
  gfm: true,
  tables: false,
  breaks: true,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false,
  highlight: function (code, lang, callback) {
    return highlightjs.highlightAuto(code).value
  }
})

const IMG_REGEXP = /\.(png|jpg|gif|jpeg)$/i

/**
 * @example
 * MarkedService(text)
 * .catch(error => cb(error))
 * .then(html => cb(null, html))
 *
 */
module.exports = function MarkedService (text) {
  var html = marked(text)
  return Promise.resolve(html)
}

/**
 * Функция которая заменяет стандартный рендеринг ссылок в marked
 */
function renderLink (href, title, text) {
  if (this.options.sanitize) {
    try {
      var prot = decodeURIComponent(unescape(href))
        .replace(/[^\w:]/g, '')
        .toLowerCase()
    } catch (e) {
      return ''
    }
    if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0) {
      return ''
    }
  }
  var out = '<a href="' + href + '" rel="nofollow" target="_blank"'

  if (title) {
    out += ' title="' + title + '"'
  }

  if (href === text && IMG_REGEXP.test(href)) {
    out += ' class="js-link-image"'
  }
  out += '>' + text + '</a>'

  return out
}
