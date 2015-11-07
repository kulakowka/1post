/**
 * @example
 * var html = marked(text)
 */

var marked = require('marked')
var highlightjs = require('highlight.js')
var renderer = new marked.Renderer()

const IMG_REGEXP = /\.(png|jpg|gif|jpeg)$/i

renderer.link = function (href, title, text) {
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

marked.setOptions({
  renderer: renderer,
  gfm: true,
  tables: false,
  breaks: true,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false,
  highlight: (code, lang, callback) => {
    return highlightjs.highlightAuto(code).value
  }
})

module.exports = marked

module.exports = function MarkedService (text) {
  return new Promise((resolve, reject) => {
    resolve(marked(text))
  })
}
