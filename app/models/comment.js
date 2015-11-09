'use strict'

const ROOT_PARENT_ID = require('../config/comments').ROOT_PARENT_ID

var truncate = require('truncate')
var cheerio = require('cheerio')
var EmbedlyService = require('../services/embedly')
var mongoose = require('../config/db')
var Schema = mongoose.Schema

var Comment = Schema({
  metaTitle: {
    type: String,
    trim: true,
    minlength: 1,
    maxlength: 200
  },
  metaDescription: {
    type: String,
    trim: true,
    minlength: 1,
    maxlength: 200
  },
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

  EmbedlyService(comment.textSource)
  .catch(next)
  .then(html => {
    Object.assign(comment, getMetaTagsFromText(html))
    next()
  })
})

// Comment.updateRepliesCount(comment._id, cb)
Comment.static('updateRepliesCount', function updateRepliesCount (id, next) {
  if (ROOT_PARENT_ID === id) return
  var model = this
  model
  .where({parentId: id})
  .count((err, count) => {
    if (err) return next(err)
    model.findOneAndUpdate({_id: id}, {repliesCount: count}).exec(next)
  })
})

var CommentModel = mongoose.model('Comment', Comment)

module.exports = CommentModel


// TODO: Надо вынести в сервисы
function getMetaTagsFromText (html) {
  var $ = cheerio.load(html)
  var title = $('h1, h2, h3, h4, h5, p').first().text()
  var description = $('h1, h2, h3, h4, h5, p').eq(1).text()

  return {
    textHtml: html,
    metaTitle: truncate(title, 150),
    metaDescription: truncate(description, 160)
  }
}
