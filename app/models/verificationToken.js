'use strict'

var uuid = require('node-uuid')

var mongoose = require('../config/db')

var Schema = mongoose.Schema

var VerificationTokenSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  token: {
    type: String,
    required: true
    // index: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    expires: '4h'
  }
})

VerificationTokenSchema.methods.createVerificationToken = function (done) {
  var verificationToken = this
  var token = uuid.v4()
  verificationToken.set('token', token)
  verificationToken.save((err) => {
    if (err) return done(err)
    done(null, token)
    console.log('Verification token', verificationToken)
  })
}

VerificationTokenSchema.static('verifyUser', function verifyUser (token, done) {
  this
  .findOne({token: token})
  .populate('user')
  .exec()
  .catch(done)
  .then(doc => {
    var user = doc.user
    user.emailConfirmed = true
    user.save(err => {
      if (err) return done(err)
      done()
    })
  })
})

var VerificationTokenModel = mongoose.model('VerificationToken', VerificationTokenSchema)

module.exports = VerificationTokenModel
