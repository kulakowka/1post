
var kue = require('kue')
var mailgun = require('mailgun-js')({
  apiKey: 'key-2fea16609fb8a7434a05e84a4c480ac1',
  domain: 'sandboxa2fa6aec1054486ba188ee59ad0fcdbd.mailgun.org'
})

// создадим очередь для отправки сообщений
var queue = kue.createQueue()

// экспортнем ее для переиспользования в других модулях
module.exports.queue = queue

// пока обработку очередей можно прямо тут оставить в общем то.
// но по хорошему, в будующем надо бы вынести это в отдельное приложение
// В общем, организация структуры - это будет потом. Сначала надо сделать чтобы работало :)
queue.process('email', sendEmail)

function sendEmail (job, done) {
  var user = job.data.user
  var data = {
    title: 'Confirmation email to ' + user.username,
    from: '1Po.st <hello@1po.st>',
    to: job.data.user.email,
    subject: 'Confirm email please',
    text: 'Testing some Mailgun awesomness!'
  }

  mailgun.messages().send(data, (err, body) => {
    if (err) return done(err)
    done()
    // console.log(body);
  })
}
