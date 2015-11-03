var $ = require('jquery')

$(document).on('click', '.js-button-logout', function () {
  $.post('/api/users/logout', function () {
    document.location.href = '/'
  })
  return false
})

$(document).on('submit', 'form[name="loginForm"]', function () {
  var data = $(this).serialize()
  $.post('/api/users/login', data, function (json) {
    if (json.user) document.location.href = '/'// + json.user.username
  })
  return false
})
