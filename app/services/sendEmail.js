var queue = require('../config/kue').queue


// var data = {
//     user: req.user,
//     template: 'welcome-email'
//   }
function SendEmail (data) {

  // отправить задание в очередь
  var job = queue
  .create('email', data)
  .removeOnComplete(true)
  .save(err => {
    if (err) console.log('job create error::: ', err)
  })

  // job
  // .on('complete', result => console.log('Job completed with data ', result))
  // .on('failed attempt', (errorMessage, doneAttempts) => console.log('Job failed'))
  // .on('failed', errorMessage => console.log('Job failed'))
  // .on('progress', (progress, data) => console.log('\r  job #' + job.id + ' ' + progress + '% complete with data ', data ))
}

module.exports = SendEmail
