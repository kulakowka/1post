var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')

const PUBLIC_MAX_AGE = 1000 * 60 * 60 * 24 * 8 // 8 дней
const STATIC_MAX_AGE = 1000 * 60 * 60 * 24 * 14 // 14 дней

module.exports.public = express.static(path.resolve(__dirname, '../../public'), {
  maxAge: PUBLIC_MAX_AGE
})
module.exports.static = express.static(path.resolve(__dirname, '../../static'), {
  maxAge: STATIC_MAX_AGE
})
module.exports.favicon = favicon(path.join(__dirname, '../../static/favicon.ico'))
