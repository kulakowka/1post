var kue = require('kue')
var GetEmailTemplateService = require('../services/emails/getTemplate')

var mailgun = require('mailgun-js')({
  apiKey: 'key-2fea16609fb8a7434a05e84a4c480ac1',
  domain: 'sandboxa2fa6aec1054486ba188ee59ad0fcdbd.mailgun.org'
})

// кол-во одновременно выполняющихся заданий
const maxActiveJobs = 20

// создадим очередь для отправки сообщений
var Queue = kue.createQueue({
  jobEvents: false  // отключим события на объектах job для лучшей производительности
})

// экспортнем ее для переиспользования в других модулях
module.exports.Queue = Queue

// Стартуем очередь
Queue.process('email', maxActiveJobs, processEmail)

/**
 * Функция вызывается для каждого задания в очереди
 */
function processEmail (job, done) {
  GetEmailTemplateService(job.data)
  .then(result => {
    var data = getData(job, result)

    mailgunSend(data, done)
  })
  .catch(done)
}

/**
 * Функция формирует и возвращает специальным образом отформатированный объект,
 * необходимый для отправки в mailGun
 */
function getData (job, result) {
  return {
    from: '1Po.st <hello@1po.st>',  // TODO: надо вынести в глобальный конфиг
    to: job.data.user.email,
    subject: job.data.title,
    html: result.html
  }
}

/**
 * Функция для работы с API Mailgun
 * Отправляет сообщение на указанный адрес
 */
function mailgunSend (data, done) {
  mailgun.messages().send(data, (err, body) => {
    if (err) return done(err)
    done()
  })
}
