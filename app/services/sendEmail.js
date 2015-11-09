var Queue = require('../config/kue').Queue

// data = {
//  title: 'Welcome',
//  to: 'kulakowka@gmail.com',
//  template: 'welcome'
// }
function SendEmail (data) {
  Queue
  .create('email', data)
  // .removeOnComplete(true)  // в продакшн режиме надо включить, но пока настраиваю лучше ничего не удалять
  .delay(1000) // milliseconds
  .priority('high')
  .save()
}

module.exports = SendEmail
