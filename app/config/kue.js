var kue = require('kue')

// создадим очередь для отправки сообщений
var emails_queue = kue.createQueue()

module.exports.emails_queue = emails_queue

// пока обработку очередей можно прямо тут оставить в общем то.
// но по хорошему, в будующем надо бы вынести это в отдельное приложение
emails_queue.process('email', email);


function email(job, done) {
  // if(!isValidEmail(data.to)) {
  //   //done('invalid to address') is possible but discouraged
  //   return done(new Error('invalid to address'));
  // }
  //console.log('send email to ' + job.data.to + ' template: ' + job.data.template)
  // email send stuff...
  done();
}