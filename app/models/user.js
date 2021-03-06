'use strict'

var bcrypt = require('bcrypt')

// Other models
var Comment = require('./comment')
var VerificationToken = require('./verificationToken')

// Services
var SendEmail = require('../services/emails/sendEmail')

// Mongoose plugins
var abilities = require('./plugins/abilities')
var createdAt = require('./plugins/createdAt')
var updatedAt = require('./plugins/updatedAt')
var deletedAt = require('./plugins/deletedAt')

var mongoose = require('../config/db')

var Schema = mongoose.Schema

var User = Schema({
  username: {
    type: String,
    index: true,
    trim: true,
    minlength: 3,
    maxlength: 20,
    required: true,
    lowercase: true,
    unique: true
  },
  email: {
    type: String,
    index: true,
    trim: true,
    minlength: 3,
    maxlength: 20,
    lowercase: true,
    unique: true
  },
  emailConfirmed: {
    type: Boolean
  },
  password: {
    type: String,
    required: true
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  commentsCount: {
    type: Number,
    required: true,
    index: true,
    default: 0
  }
})

User.plugin(createdAt, { index: true })
User.plugin(updatedAt)
User.plugin(deletedAt)
User.plugin(abilities) // ACL

User.methods.comparePassword = function comparePassword (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, callback)
}

User.methods.generateConfirmationToken = function generateConfirmationToken (callback) {
  var verificationToken = new VerificationToken({user: this._id})
  verificationToken.createVerificationToken(callback)
}

User.static('updateCommentsCount', function updateCommentsCount (id, next) {
  var model = this
  Comment
  .where({
    creator: id,
    isDeleted: {
      $ne: true
    }
  })
  .count((err, count) => {
    if (err) return next(err)
    model.findOneAndUpdate({_id: id}, {commentsCount: count}).exec(next)
  })
})

User.pre('save', function (next) {
  var user = this

  if (!user.isModified('password')) return next()

  bcrypt.genSalt((err, salt) => {
    if (err) return next(err)

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err)

      user.password = hash
      next()
    })
  })
})

User.pre('save', function (next) {
  var user = this

  if (!user.isModified('email')) return next()

  user.emailConfirmed = false
  next()

  user.generateConfirmationToken((err, token) => {
    if (err) return next(err)
    SendEmail({
      title: 'Confirmation instructions',
      user: user,
      token: token,
      template: 'users/confirm-email'
    })
  })
})

module.exports = mongoose.model('User', User)
