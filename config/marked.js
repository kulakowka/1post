// Using async version of marked
// marked(markdownString, function (err, content) {
//   if (err) throw err;
//   console.log(content);
// })

var marked = require('marked')
var highlightjs = require('highlight.js')

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false,
  highlight: (code, lang, callback) => {
    return highlightjs.highlightAuto(code).value
  }
})

module.exports = marked
