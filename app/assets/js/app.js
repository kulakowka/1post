var $ = require('jquery')
var attachFastClick = require('fastclick')

attachFastClick(document.body)

var comments = require('./includes/comments')
var users = require('./includes/users')

$(document)

  // comments
  .on('submit', '.js-form-comment', comments.commentCreate)
  .on('click', '.js-comment-replies', comments.onClickRepliesCount)
  .on('click', '.js-comment-reply', comments.onClickReply)
  .on('click', '.js-comment-delete', comments.onClickDelete)
  .on('ready', comments.loadInitialComments)
  .on('ready', comments.initTextareaAutosize)
  .on('ready', comments.executeImages)

  // users
  .on('click', '.js-button-logout', users.logout)
  .on('submit', '.js-form-login', users.login)
  .on('submit', '.js-form-register', users.register)
  .on('submit', '.js-form-user-update', users.userUpdate)
  .on('submit', '.js-form-user-destroy', users.userDestroy)
