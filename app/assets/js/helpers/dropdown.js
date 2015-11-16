var $ = require('jquery')

module.exports.onClickHandler = onClickHandler

function onClickHandler () {
  var handler = $(this)
  var dropdown = handler.closest('.dropdown')
  if (dropdown.hasClass('open')) {
    dropdown.removeClass('open')
  } else {
    $('.dropdown.open').removeClass('open')
    dropdown.addClass('open')
  }
  return false
}
