var $ = require('jquery')

module.exports.onClickHandler = onClickHandler

function onClickHandler () {
  var handler = $(this)
  var dropdown = handler.closest('.dropdown')
  $('.dropdown.open').removeClass('open')
  dropdown.toggleClass('open')
  return false
}
