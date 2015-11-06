'use strict'

const ROOT_PARENT_ID = require('../config/comments').ROOT_PARENT_ID

var truncate = require('truncate')
var cheerio = require('cheerio')
var marked = require('../config/marked')
var embedly = require('../services/embedly')
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

// Need refactoring !!!
Comment.pre('save', function (next) {
  var comment = this
  if (!comment.isModified('textSource')) return next()

  var url = embedly.getUrl(comment.textSource)
  if (url) {
    embedly.getLinkHtml(comment.textSource, (err, html) => {
      if (err) comment.textHtml = marked(comment.textSource)
      else comment.textHtml = html
      Object.assign(comment, getMetaTagsFromText(comment.textHtml))
      next()
    })
  } else {
    comment.textHtml = marked(comment.textSource)
    Object.assign(comment, getMetaTagsFromText(comment.textHtml))
    next()
  }
})

// здесь id - это id родителя
Comment.static('updateRepliesCount', function (id) {
  // у рутовых комментов нет настоящего родителя
  if (ROOT_PARENT_ID === id) return

  var model = this
  model
    .where({ parentId: id })
    .count((err, count) => {
      if (err) return
      model
        .findOneAndUpdate({_id: id}, {repliesCount: count})
        .exec()
    })
})

var CommentModel = mongoose.model('Comment', Comment)

module.exports = CommentModel

function getMetaTagsFromText (html) {
  var $ = cheerio.load(html)
  var title = $('h1, h2, h3, h4, h5, p').first().text()
  var description = $('h1, h2, h3, h4, h5, p').eq(1).text()
  return {
    metaTitle: truncate(title, 150),
    metaDescription: truncate(description, 160)
  }
}
