// Using async version of marked
// marked(markdownString, function (err, content) {
//   if (err) throw err;
//   console.log(content);
// })

var marked = require('marked')
var highlightjs = require('highlight.js')
var renderer = new marked.Renderer()

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
  var out = '<a href="' + href + '"'
  if (title) {
    out += ' title="' + title + '"'
  }
  var reg = /\.(png|jpg|gif|jpeg)$/i
  if (href === text && reg.test(href)) {
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
