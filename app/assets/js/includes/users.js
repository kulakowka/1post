/* global confirm */

var $ = require('jquery')

module.exports.logout = logout
module.exports.login = login
module.exports.register = register
module.exports.userUpdate = userUpdate
module.exports.userDestroy = userDestroy

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

function userDestroy () {
  if (!confirm('Are you sure?')) return
  var data = $(this).serialize()
  $.post('/api/users/destroy', data, function (json) {
    if (json.user) document.location.href = '/' + json.user.username
  }, 'json')
  return false
}
