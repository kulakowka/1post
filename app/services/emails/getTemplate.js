var EmailTemplate = require('email-templates').EmailTemplate
var path = require('path')

/**
 * @param  {object} data {user: {}, template: 'users/confirm'}
 * @param  {function} callback function(err, results) ==> result.html || result.text
 */
module.exports = function getTemplate (data, callback) {
  var templateDir = path.join(__dirname, '../..', 'views/emails/', data.template)

  var newsletter = new EmailTemplate(templateDir)

  newsletter.render(data, callback)
}
