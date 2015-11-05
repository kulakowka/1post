'use strict'

const ROOT_PARENT_ID = require('../config/comments').ROOT_PARENT_ID

var marked = require('../config/marked')
var mongoose = require('../config/db')
var Schema = mongoose.Schema

var Comment = Schema({
  textSource: {
    type: String,
    trim: true,
    minlength: 1,
    maxlength: 100000,
    required: true
  },
  textHtml: {
    type: String,
    trim: true,
    maxlength: 200000
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  },
  repliesCount: {
    type: Number,
    required: true,
    default: 0
  },
  parentId: {
    type: Schema.Types.ObjectId,
    ref: 'Comment',
    index: true,
    required: true,
    default: ROOT_PARENT_ID
  }
})

var createdAt = require('./plugins/createdAt')
var updatedAt = require('./plugins/updatedAt')
var deletedAt = require('./plugins/deletedAt')

Comment.plugin(createdAt, { index: true })
Comment.plugin(updatedAt)
Comment.plugin(deletedAt)

Comment.pre('save', function (next) {
  var comment = this

  if (!comment.isModified('textSource')) return next()

  comment.textHtml = marked(comment.textSource)
  next()
})

// здесь id - это id родителя
Comment.static('updateRepliesCount', function (id) {
  if (ROOT_PARENT_ID === id) return
  var model = this
  model
    .where({ parentId: id })
    .count((err, count) => {
      if (err) return
      console.log('------')
      console.log('updateRepliesCount', count, id)
      // здесб count - это сколько ответов у коммента id
      model
        .findOneAndUpdate({_id: id}, {repliesCount: count})
        .exec((error, result) => {
          if (error) console.log(error)
          console.log('repliesCount updated', result)
        })
    })
})

var CommentModel = mongoose.model('Comment', Comment)

module.exports = CommentModel
