var $ = require('jquery')

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

$(document).on('click', '.js-button-logout', logout)
$(document).on('submit', '.js-form-login', login)
$(document).on('submit', '.js-form-register', register)
$(document).on('submit', '.js-form-user-update', userUpdate)
$(document).on('submit', '.js-form-user-destroy', userDestroy)
