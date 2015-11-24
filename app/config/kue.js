var kue = require('kue')
var GetEmailTemplateService = require('../services/emails/getTemplate')

const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY || 'sandboxa2fa6aec1054486ba188ee59ad0fcdbd.mailgun.org'
const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN || 'key-2fea16609fb8a7434a05e84a4c480ac1'

var mailgun = require('mailgun-js')({
  apiKey: MAILGUN_API_KEY,
  domain: MAILGUN_DOMAIN
})

const maxActiveJobs = 20

// Disable events on objects for better job performance
var Queue = kue.createQueue({
  jobEvents: false
})

module.exports.Queue = Queue

// Start queue
Queue.process('email', maxActiveJobs, processEmail)

/**
 * The function is called for each job in the queue
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
 * The function generates and returns a specially formatted object required to be sent to mailGun
 */
function getData (job, result) {
  return {
    from: '1Po.st <hello@1po.st>',  // TODO: necessary to make a global configuration
    to: job.data.user.email,
    subject: job.data.title,
    html: result.html
  }
}

/**
 * Functions for working with API Mailgun
 * It sends a message to a specified address
 */
function mailgunSend (data, done) {
  mailgun.messages().send(data, (err, body) => {
    if (err) return done(err)
    done()
  })
}
