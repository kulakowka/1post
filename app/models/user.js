'use strict'

var bcrypt = require('bcrypt')
var mongoose = require('../config/db')
var Comment = require('./comment')
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

var createdAt = require('./plugins/createdAt')
var updatedAt = require('./plugins/updatedAt')
var deletedAt = require('./plugins/deletedAt')

User.plugin(createdAt, { index: true })
User.plugin(updatedAt)
User.plugin(deletedAt)

User.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return callback(err)
    callback(null, isMatch)
  })
}

// здесь id - это id родителя
User.static('updateCommentsCount', function (id) {
  var model = this
  Comment
    .where({ creator: id })
    .count((err, count) => {
      if (err) return
      model
        .findOneAndUpdate({_id: id}, {commentsCount: count})
        .exec()
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

module.exports = mongoose.model('User', User)
