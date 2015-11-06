var stylus = require('stylus')
var nib = require('nib')
var path = require('path')

function compile (str, path) {
  return stylus(str)
   .set('filename', path)
   .set('compress', true)
   .use(nib())
   .import('nib')
}

module.exports = stylus.middleware({
  src: path.resolve(__dirname, '../assets'),
  dest: path.resolve(__dirname, '../../public'),
  compile: compile
})
