var express = require('express')
var path = require('path')
// var oneDay = 60000

module.exports = express.static(path.resolve(__dirname, '../public')) // , { maxAge: oneDay }
