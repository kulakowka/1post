/* global ga */

var $ = require('jquery')

module.exports.onArticleTitleClickHandler = onArticleTitleClickHandler

function onArticleTitleClickHandler () {
  var url = $(this).href()
  var commentId = $(this).closest('article').attr('id')
  ga && ga('send', 'event', 'comment', 'click', commentId + ': ' + url)
}
