/* global ga */

var $ = require('jquery')
var autosize = require('autosize')

module.exports.commentCreate = commentCreate
module.exports.loadReplies = loadReplies
module.exports.clearReplies = clearReplies
module.exports.onClickRepliesCount = onClickRepliesCount
module.exports.onClickReply = onClickReply
module.exports.onClickDelete = onClickDelete
module.exports.loadInitialComments = loadInitialComments
module.exports.initTextareaAutosize = initTextareaAutosize
module.exports.executeImages = executeImages

function commentCreate () {
  var form = this
  var id = $(form).find('input[name="parentId"]').val()
  var isRoot = $('.commentRoot').attr('id') === 'comment_' + id
  var data = $(form).serialize()
  var replies = $('#comment_' + id).find('> .replies')

  if (isRoot) {
    form.reset()
  } else {
    $(form).remove()
  }
  $.post('/c/create', data, function (html) {
    if (isRoot) {
      replies.prepend(html)
    } else {
      replies.append(html)
    }
    autosize.update($(form).find('textarea'))
    executeImages()
    ga('send', 'event', 'comment', 'create', isRoot ? 'root' : id)
  }, 'html')

  return false
}

function loadReplies (id) {
  var comment = $('#comment_' + id)
  var replies = comment.find('> .replies')

  $.get('/c/' + id + '/replies', function (html) {
    replies.html(html)
    autosize(comment.find('.commentForm textarea'))
    executeImages()
  }, 'html')
}

function clearReplies (id) {
  var comment = $('#comment_' + id)
  var replies = comment.find('> .replies')

  replies.html('')
}

function onClickRepliesCount () {
  var link = $(this)
  var id = link.attr('data-id')

  if (link.hasClass('loaded')) {
    clearReplies(id)
    link.removeClass('loaded')
  } else {
    loadReplies(id)
    link.addClass('loaded')
  }

  return false
}

function onClickReply () {
  var link = $(this)
  var id = link.attr('data-id')
  var form = $('.commentForm').first()
  var replyForm = form.clone()
  var comment = link.closest('.commentItem')
  var replies = comment.find('> .replies')
  replyForm.find('input[name="parentId"]').val(id)
  replies.find('.commentForm').remove()
  replies.append(replyForm)
  autosize(replyForm.find('textarea'))
  replyForm.find('textarea').val('').focus()
  return false
}

function onClickDelete () {
  var link = $(this)
  var id = link.attr('data-id')

  $.post('/c/' + id + '/delete', function (html) {
    $('#comment_' + id).replaceWith(html)
  })
  return false
}

function loadInitialComments () {
  var comment = $('#commentsShow > .commentItem').first()
  if (!comment.length) return
  comment.find('.js-comment-replies').click()
}

function initTextareaAutosize () {
  autosize($('textarea.js-textarea-autosize'))
}

function executeImages () {
  $('.js-link-image').each(function () {
    var img = $('<img>')
    var href = $(this).attr('href')
    var text = $(this).text()
    if (href !== text) return
    img.attr('src', href)
    $(this).html(img)
  })
}

// function cdnImage (url, width) {
//   return 'https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?url=' + url + '&container=focus&refresh=2592000&resize_w=' + width
// }
