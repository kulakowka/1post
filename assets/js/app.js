var $ = require('jquery')

$(document).on('submit', 'form[name="logoutForm"]', function () {
  console.log('logout')
  return false
})
