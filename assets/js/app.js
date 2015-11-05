var $ = require('jquery')
var autosize = require('autosize')

function logout () {
  $.post('/api/users/logout', function () {
    document.location.href = '/'
  }, 'json')
  return false
}

function login () {
  var data = $(this).serialize()
  $.post('/api/users/login', data, function (json) {
    if (json.user) document.location.href = '/'// + json.user.username
  }, 'json')
  return false
}

function register () {
  var data = $(this).serialize()
  $.post('/api/users/register', data, function (json) {
    if (json.user) document.location.href = '/' + json.user.username
  }, 'json')
  return false
}

function userUpdate () {
  var data = $(this).serialize()
  $.post('/api/users/update', data, function (json) {
    if (json.user) document.location.href = '/' + json.user.username
  }, 'json')
  return false
}
/* global confirm */
function userDestroy () {
  if (!confirm('Are you sure?')) return
  var data = $(this).serialize()
  $.post('/api/users/destroy', data, function (json) {
    if (json.user) document.location.href = '/' + json.user.username
  }, 'json')
  return false
}

function commentCreate () {
  var form = this
  var data = $(form).serialize()
  $.post('/api/comments/create', data, function (json) {
    loadReplies(json.comment.parentId)
    form.reset()
  }, 'json')

  return false
}

function loadReplies (id) {
  var comment = $('#comment_' + id)
  var replies = comment.find('> .replies')

  $.get('/comments/' + id + '/replies', function (html) {
    replies.html(html)
    autosize(comment.find('.commentForm textarea').addClass('autosized'))
    executeImages()
  }, 'html')
}

function onClickRepliesCount () {
  var link = $(this)
  var id = link.attr('data-id')

  loadReplies(id)

  return false
}

function loadInitialComments () {
  var comment = $('#commentsShow > .commentItem').first()
  if (!comment.length) return
  comment.find('.js-comment-replies').click()
}

function initTextareaAutosize () {
  autosize($('textarea.js-textarea-autosize').addClass('autosized'))
}

function executeImages () {
  $('.js-link-image').each(function () {
    var img = $('<img>')
    img.attr('src', $(this).attr('href'))
    $(this).html(img)
  })
}

var $document = $(document)
$document.on('click', '.js-button-logout', logout)
$document.on('submit', '.js-form-login', login)
$document.on('submit', '.js-form-register', register)
$document.on('submit', '.js-form-user-update', userUpdate)
$document.on('submit', '.js-form-user-destroy', userDestroy)
$document.on('submit', '.js-form-comment', commentCreate)
$document.on('click', '.js-comment-replies', onClickRepliesCount)
$document.on('ready', loadInitialComments)
$document.on('ready', initTextareaAutosize)
$document.on('ready', executeImages)
