/* global ga */

var $ = require('jquery')

module.exports.onArticleTitleClickHandler = onArticleTitleClickHandler

function onArticleTitleClickHandler () {
  var commentId = $(this).closest('article').attr('id')
  ga('send', 'event', 'comment', 'click', commentId)
}
