var EmailTemplate = require('email-templates').EmailTemplate
var path = require('path')

/**
 * Функция возвращает отрендереный шаблон письма в колбек
 * колбек принимает 2 параметра - err и results
 * @example
 * GetEmailTemplateService(job.data)
 * .catch(error => cb(error))
 * .then(html => cb(null, html))
 */
module.exports = function GetEmailTemplateService (data) {
  var templateDir = path.join(__dirname, '../..', 'views/emails/', data.template)
  var newsletter = new EmailTemplate(templateDir)

  return new Promise((resolve, reject) => {
    newsletter.render(data, (err, result) => {
      if (err) return reject(err)
      resolve(result)
    })
  })
}
