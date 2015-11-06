var $ = require('jquery')
var autosize = require('autosize')

$(document)
  .on('submit', '.js-form-comment', commentCreate)
  .on('click', '.js-comment-replies', onClickRepliesCount)
  .on('click', '.js-comment-reply', onClickReply)
  .on('ready', loadInitialComments)
  .on('ready', initTextareaAutosize)
  .on('ready', executeImages)

function commentCreate () {
  var form = this
  var id = $(form).find('input[name="parentId"]').val()
  var isRoot = $('.commentRoot').attr('id') === 'comment_' + id
  var data = $(form).serialize()
  var replies = $('#comment_' + id).find('> .replies')

  $.post('/comments/create', data, function (html) {
    if (isRoot) {
      replies.prepend(html)
      form.reset()
      autosize.update($(form).find('textarea'))
    } else {
      replies.append(html)
      $(form).remove()
    }
    executeImages()
  }, 'html')

  return false
}

function loadReplies (id) {
  var comment = $('#comment_' + id)
  var replies = comment.find('> .replies')

  $.get('/comments/' + id + '/replies', function (html) {
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
    img.attr('src', $(this).attr('href'))
    $(this).html(img)
  })
}
