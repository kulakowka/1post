'use strict'

var mongoose = require('mongoose')

// Default parentId for comments at mainpage
const ROOT_PARENT_ID = mongoose.Types.ObjectId('4edd40c86762e0fb12000003')

module.exports.ROOT_PARENT_ID = ROOT_PARENT_ID
