var Queue = require('../../config/kue').Queue

// data = {
//  title: 'Welcome',
//  to: 'kulakowka@gmail.com',
//  template: 'welcome'
// }
module.exports = function sendEmail (data) {
  Queue
  .create('email', data)
  .removeOnComplete(true)
  .delay(1000) // milliseconds
  .priority('high')
  .save()
}
