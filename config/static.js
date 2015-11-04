var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
// var oneDay = 60000

module.exports.public = express.static(path.resolve(__dirname, '../public')) // , { maxAge: oneDay }
module.exports.static = express.static(path.resolve(__dirname, '../static')) // , { maxAge: oneDay }
module.exports.favicon = favicon(path.join(__dirname, '../static/favicon.ico'))
