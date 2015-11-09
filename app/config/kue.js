
var kue = require('kue')
var getTemplate = require('../services/emails/getTemplate')

var mailgun = require('mailgun-js')({
  apiKey: 'key-2fea16609fb8a7434a05e84a4c480ac1',
  domain: 'sandboxa2fa6aec1054486ba188ee59ad0fcdbd.mailgun.org'
})

// создадим очередь для отправки сообщений
var Queue = kue.createQueue({
  jobEvents: false  // отключим события на объектах job для лучшей производительности
})

// экспортнем ее для переиспользования в других модулях
module.exports.Queue = Queue

// пока обработку очередей можно прямо тут оставить в общем то.
// но по хорошему, в будующем надо бы вынести это в отдельное приложение
// В общем, организация структуры - это будет потом. Сначала надо сделать чтобы работало :)
const maxActiveJobs = 20
Queue.process('email', maxActiveJobs, sendEmail)

function sendEmail (job, done) {
  getTemplate(job.data, (err, result) => {
    if (err) return done(err)

    var data = {
      from: '1Po.st <hello@1po.st>',
      to: job.data.user.email,
      subject: job.data.title,
      html: result.html
    }

    mailgun.messages().send(data, (err, body) => {
      if (err) return done(err)
      done()
      console.log('mail send success ', body)
    })
  })
}
